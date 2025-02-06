import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { removeImage, updateImage, uploadImage } from "@/utils/firebaseStorage";
import { sendEmail } from "@/utils/sendEmail";
import { generateId } from "@/utils/generateId";
import { createSlug } from "@/utils/slugify";
import { getTranslations } from "next-intl/server";

async function getPage(request: Request) {
  try {
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
        name: true,
        date: true,
        about: true,
        picture: true,
        pictures: {
          select: {
            url: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      type: "success",
      message: "Page retrieved successfully",
      data: page,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getPage function:", error);
      return NextResponse.json(
        {
          type: "error",
          message: "Internal Server Error",
          details: error.message,
        },
        { status: 500 }
      );
    }
  }
}

async function getPageLink(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { type: "error", message: "User ID is required" },
        { status: 400 }
      );
    }

    const page = (await prisma.page.findFirst({
      where: {
        couple: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        randomId: true,
        slug: true,
      },
    })) as { randomId: string; slug: string };

    if (!page) {
      return NextResponse.json(
        { type: "error", message: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      type: "success",
      message: "Page retrieved successfully",
      link: `${page.randomId}/${page.slug}`,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getPageLink function:", error);
      return NextResponse.json(
        {
          type: "error",
          message: "Internal Server Error",
          details: error.message,
        },
        { status: 500 }
      );
    }
  }
}

async function getPageDetails(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageRandomId = searchParams.get("pageRandomId") as string;
  const pageSlug = searchParams.get("pageSlug");

  const page = await prisma.page.findFirst({
    where: {
      randomId: pageRandomId,
      slug: pageSlug,
    },
    select: {
      id: true,
      randomId: true,
      slug: true,
      name: true,
      date: true,
      about: true,
      picture: true,
      pictures: {
        select: {
          url: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json({
    type: "success",
    message: "Page retrieved successfully",
    data: page,
  });

  // if (!id) {
  //   return NextResponse.json(
  //     { type: "error", message: "User ID or Couple ID is required" },
  //     { status: 400 }
  //   );
  // }

  // try {
  //   const whereCondition = pageId
  //     ? { id: pageId }
  //     : userId
  //     ? {
  //         couple: {
  //           some: {
  //             userId: userId,
  //           },
  //         },
  //       }
  //     : undefined;

  //   const page = await prisma.page.findFirst({
  //     where: whereCondition,
  //     select: {
  //       id: true,
  //       link: true,
  //       name: true,
  //       date: true,
  //       about: true,
  //       picture: true,
  //       publications: {
  //         select: {
  //           id: true,
  //           message: true,
  //           createdAt: true,
  //           user: {
  //             select: {
  //               name: true,
  //             },
  //           },
  //         },
  //         orderBy: {
  //           createdAt: "desc",
  //         },
  //       },
  //       pictures: {
  //         select: {
  //           url: true,
  //           name: true,
  //         },
  //       },
  //     },
  //   });

  //   if (!page) {
  //     return NextResponse.json(
  //       { type: "error", message: "Page not found" },
  //       { status: 404 }
  //     );
  //   }

  //   return NextResponse.json({
  //     type: "success",
  //     message: "Page retrieved successfully",
  //     data: page,
  //   });
  // } catch (error) {
  //   console.error("Error fetching page:", error);
  //   return NextResponse.json(
  //     { type: "error", message: "Error fetching page" },
  //     { status: 500 }
  //   );
  // }
}

async function getPagePublications(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageRandomId = searchParams.get("pageRandomId") as string;
  const pageSlug = searchParams.get("pageSlug") as string;

  const page = await prisma.publication.findMany({
    where: {
      page: {
        randomId: pageRandomId,
        slug: pageSlug,
      },
    },
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
  });

  return NextResponse.json({
    type: "success",
    message: "Page retrieved successfully",
    data: page,
  });
}

async function createPage(request: Request) {
  try {
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

    const randomId = generateId();
    const slug = createSlug(name);

    await prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        randomId,
        slug,
      },
    });

    return NextResponse.json({
      type: "success",
      message: "Success on generate new couple page",
      code: 202,
      link: `${randomId}/${slug}`,
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
  const t = await getTranslations("Invitation");
  const { userEmail: email, userId, locale } = await request.json();

  const {
    id: pageId,
    randomId: pageRandomId,
    slug: pageSlug,
  } = await prisma.page.findFirstOrThrow({
    where: {
      couple: {
        some: {
          userId,
        },
      },
    },
    select: {
      id: true,
      randomId: true,
      slug: true,
    },
  });

  const user = await prisma.user.create({
    data: { email },
  });

  await prisma.couple.create({
    data: {
      pageId,
      userId: user.id,
      type: "PARTNER",
    },
  });

  const inviteLink = `${process.env.NEXTAUTH_URL}/${locale}/${pageRandomId}/${pageSlug}`;
  await sendEmail(email, `${t("text")} ${inviteLink}`);

  return NextResponse.json({
    type: "success",
    message: "Success on inviting user",
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

  if (action === "getPageLink") {
    return await getPageLink(request);
  }

  if (action === "getPage") {
    return await getPage(request);
  }

  if (action === "getPageDetails") {
    return await getPageDetails(request);
  }

  if (action === "getPagePublications") {
    return await getPagePublications(request);
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
