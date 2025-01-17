import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { removeImage, updateImage, uploadImage } from "@/utils/firebaseStorage";
import { sendEmail } from "@/utils/sendEmail";
import { generateInviteToken } from "@/utils/generateInviteToken";

async function getPage(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { type: "error", message: "User ID is required" },
      { status: 400 }
    );
  }

  const page = await prisma.page.findFirst({
    where: {
      couple: {
        some: {
          userId,
        },
      },
    },
    select: {
      id: true,
      link: true,
    },
  });

  let dataValue: { id: string | null; link: string | null } = {
    id: "",
    link: "",
  };

  if (page) {
    dataValue = page;
  }

  return NextResponse.json({
    type: "success",
    message: "Page retrieved successfully",
    data: dataValue,
  });
}

async function getPageDetails(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");
  const userId = searchParams.get("userId");

  const id = pageId || userId;

  if (!id) {
    return NextResponse.json(
      { type: "error", message: "User ID or Couple ID is required" },
      { status: 400 }
    );
  }

  console.log(id);

  try {
    const whereCondition = pageId
      ? { id: pageId }
      : userId
      ? {
          couple: {
            some: {
              userId: userId,
            },
          },
        }
      : undefined;

    const page = await prisma.page.findFirst({
      where: whereCondition,
      select: {
        id: true,
        link: true,
        name: true,
        date: true,
        about: true,
        picture: true,
        publications: {
          select: {
            id: true,
            message: true,
            createdAt: true,
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        pictures: {
          select: {
            url: true,
            name: true,
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json(
        { type: "error", message: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      type: "success",
      message: "Page retrieved successfully",
      data: page,
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { type: "error", message: "Error fetching page" },
      { status: 500 }
    );
  }
}

async function getPartnerEmail(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") as string;

  const { id: pageId } = await prisma.page.findFirstOrThrow({
    where: {
      couple: {
        some: {
          userId,
        },
      },
    },
    select: {
      id: true,
    },
  });

  const couple = await prisma.couple.findFirst({
    where: {
      pageId,
      userId: {
        not: userId,
      },
    },
    select: {
      id: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json({
    type: "success",
    message: "Partner email retrieved successfully",
    data: couple,
  });
}

async function createPage(request: Request) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL;
    const formData = await request.formData();
    const userId = formData.get("userId") as string;
    const name = formData.get("name") as string;
    const date = formData.get("date") as string;
    const about = formData.get("about") as string;
    const picture = formData.get("picture") as File;

    const { id: pageId } = await prisma.page.create({
      data: {
        name,
        date,
        about,
      },
    });

    await prisma.couple.create({
      data: {
        pageId,
        userId,
      },
    });

    let pictureUrl = "";

    if (picture) {
      pictureUrl = await uploadImage(pageId, "principal", picture);
    }

    await prisma.page.update({
      where: { id: pageId },
      data: {
        picture: pictureUrl,
      },
    });

    const pictures = formData.getAll("pictures");

    await Promise.all(
      pictures.map(async (picture) => {
        if (picture instanceof File) {
          try {
            const imageUrl = await uploadImage(pageId, "gallery", picture);

            await prisma.picture.create({
              data: {
                name: picture.name,
                url: imageUrl,
                pageId,
              },
            });
          } catch (error) {
            console.error(
              "Error during picture upload or database operation:",
              error
            );
          }
        } else {
          console.warn("Invalid file:", picture);
        }
      })
    );

    const pageLink = `${baseUrl}/${pageId}`;

    await prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        link: pageLink,
      },
    });

    return NextResponse.json({
      type: "success",
      message: "Success on generate new couple page",
      code: 202,
      link: pageLink,
    });
  } catch (error) {
    console.error("Error generating page:", error);
    return NextResponse.json(
      { type: "error", message: "Error generating page" },
      { status: 500 }
    );
  }
}

async function createPublication(request: Request) {
  try {
    const { message, userId } = await request.json();

    const { id: pageId } = await prisma.page.findFirstOrThrow({
      where: {
        couple: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    await prisma.publication.create({
      data: {
        message,
        pageId,
        userId,
      },
    });

    return NextResponse.json({
      type: "success",
      message: "Success on generate new couple page",
      code: 202,
    });
  } catch (error) {
    console.error("Error generating page:", error);
    return NextResponse.json(
      { type: "error", message: "Error generating page" },
      { status: 500 }
    );
  }
}

async function inviteUser(request: Request) {
  const { userEmail: email, userId } = await request.json();

  const inviteToken = generateInviteToken();

  const { pageId } = await prisma.couple.findFirstOrThrow({
    where: {
      userId,
    },
    select: {
      pageId: true,
    },
  });

  await prisma.invite.create({
    data: {
      email,
      token: inviteToken,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
  });

  const inviteLink = `${process.env.NEXTAUTH_URL}/accept-invite?token=${inviteToken}&pageId=${pageId}`;
  await sendEmail(
    email,
    `Você foi convidado para o Couplespace! Clique no link para aceitar o convite: ${inviteLink}`
  );

  return NextResponse.json({
    type: "success",
    message: "Success on inviting user",
    code: 202,
  });
}

async function acceptInvite(request: Request) {
  const { token, pageId } = await request.json();
  const invite = await prisma.invite.findUnique({
    where: { token },
    select: { email: true, expiresAt: true },
  });

  if (!invite) {
    throw new Error("Convite inválido.");
  }

  if (invite.expiresAt < new Date()) {
    throw new Error("Convite expirado.");
  }

  // Atualizar o convite como aceito
  await prisma.invite.update({
    where: { token },
    data: { accepted: true },
  });

  // Criar o usuário no banco apenas com o email
  const user = await prisma.user.create({
    data: { email: invite.email },
  });

  // Criar o registro na tabela Couple
  await prisma.couple.create({
    data: {
      pageId,
      userId: user.id,
      type: "PARTNER", // Define como parceiro, não como proprietário
    },
  });

  // return user;
  return NextResponse.json({
    type: "success",
    message: "Success on accepting invite",
    code: 202,
  });
}

async function updatePage(request: Request) {
  try {
    const formData = await request.formData();
    const userId = formData.get("userId") as string;
    const name = formData.get("name") as string;
    const date = formData.get("date") as string;
    const about = formData.get("about") as string;
    const picture = formData.get("picture") as File;
    const pictures = formData.getAll("pictures");

    const { pageId } = await prisma.couple.findFirstOrThrow({
      where: {
        userId,
      },
      select: {
        pageId: true,
      },
    });

    await removeImage(pageId, "principal");
    await removeImage(pageId, "gallery");

    let pictureUrl = "";
    pictureUrl = await updateImage(pageId, "principal", picture);

    await prisma.page.update({
      where: { id: pageId },
      data: {
        picture: pictureUrl,
        name,
        date,
        about,
      },
    });

    // Deleting all data by pageId
    await prisma.picture.deleteMany({
      where: {
        pageId,
      },
    });

    // Creating new data by pageId
    await Promise.all(
      pictures.map(async (file) => {
        if (file instanceof File) {
          try {
            const imageUrl = await updateImage(pageId, "gallery", file);

            await prisma.picture.create({
              data: {
                name: file.name,
                url: imageUrl,
                pageId,
              },
            });
          } catch (error) {
            console.error(
              "Error during picture upload or database operation:",
              error
            );
          }
        } else {
          console.warn("Invalid file:", file);
        }
      })
    );

    // const { id: pageId } = await prisma.page.create({
    //   data: {
    //     name,
    //     date,
    //     about,
    //     userId,
    //   },
    // });

    // const pictureUrl = "";

    // if (picture) {
    //   pictureUrl = await updateImage(pageId, "principal", picture);
    // }

    // await prisma.page.update({
    //   where: { id: pageId },
    //   data: {
    //     picture: pictureUrl,
    //   },
    // });

    // const pictures = formData.getAll("pictures");

    // await Promise.all(
    //   pictures.map(async (file) => {
    //     if (file instanceof File) {
    //       try {
    //         const imageUrl = await updateImage(pageId, "gallery", file);

    //         await prisma.picture.create({
    //           data: {
    //             name: file.name,
    //             url: imageUrl,
    //             pageId,
    //           },
    //         });
    //       } catch (error) {
    //         console.error(
    //           "Error during picture upload or database operation:",
    //           error
    //         );
    //       }
    //     } else {
    //       console.warn("Invalid file:", file);
    //     }
    //   })
    // );

    // const pageLink = `${baseUrl}/${pageId}`;

    // await prisma.page.update({
    //   where: {
    //     id: pageId,
    //   },
    //   data: {
    //     link: pageLink,
    //   },
    // });

    return NextResponse.json({
      type: "success",
      message: "Success on generate new couple page",
      code: 202,
    });
  } catch (error) {
    console.error("Error generating page:", error);
    return NextResponse.json(
      { type: "error", message: "Error generating page" },
      { status: 500 }
    );
  }
}

// Handlers
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "getPage") {
    return await getPage(request);
  }

  if (action === "getPageDetails") {
    return await getPageDetails(request);
  }

  if (action === "getPartnerEmail") {
    return await getPartnerEmail(request);
  }

  return NextResponse.json(
    { type: "error", message: "Invalid action" },
    { status: 400 }
  );
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    if (action === "createPage") {
      return await createPage(request);
    }

    if (action === "createPublication") {
      return await createPublication(request);
    }

    if (action === "updatePage") {
      return await updatePage(request);
    }

    if (action === "inviteUser") {
      return await inviteUser(request);
    }

    if (action === "acceptInvite") {
      return await acceptInvite(request);
    }
  } catch (error) {
    console.error("Error on post action:", error);

    return NextResponse.json(
      {
        type: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
