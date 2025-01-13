import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { removeImage, updateImage, uploadImage } from "@/utils/firebaseStorage";

// GET Functions
async function getPage(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { type: "error", message: "User ID is required" },
      { status: 400 }
    );
  }

  const page = await prisma.couple.findFirst({
    where: {
      userId,
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
  const coupleId = searchParams.get("coupleId");
  const userId = searchParams.get("userId");

  const id = coupleId || userId;

  if (!id) {
    return NextResponse.json(
      { type: "error", message: "User ID or Couple ID is required" },
      { status: 400 }
    );
  }

  try {
    const whereCondition = coupleId
      ? { id: coupleId }
      : userId
      ? { userId: userId }
      : undefined;

    const page = await prisma.couple.findFirst({
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

// CREATE Functions
async function createPage(request: Request) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL;
    const formData = await request.formData();
    const userId = formData.get("userId") as string;
    const name = formData.get("name") as string;
    const date = formData.get("date") as string;
    const about = formData.get("about") as string;
    const picture = formData.get("picture") as File;

    const { id: coupleId } = await prisma.couple.create({
      data: {
        name,
        date,
        about,
        userId,
      },
    });

    let pictureUrl = "";

    if (picture) {
      pictureUrl = await uploadImage(coupleId, "principal", picture);
    }

    await prisma.couple.update({
      where: { id: coupleId },
      data: {
        picture: pictureUrl,
      },
    });

    const pictures = formData.getAll("pictures");

    await Promise.all(
      pictures.map(async (picture) => {
        if (picture instanceof File) {
          try {
            const imageUrl = await uploadImage(coupleId, "gallery", picture);

            await prisma.picture.create({
              data: {
                name: picture.name,
                url: imageUrl,
                coupleId,
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

    const pageLink = `${baseUrl}/${coupleId}`;

    await prisma.couple.update({
      where: {
        id: coupleId,
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

    const { id: coupleId } = await prisma.couple.findFirstOrThrow({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    await prisma.publication.create({
      data: {
        message,
        coupleId,
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

// UPDATE Functions
async function updatePage(request: Request) {
  try {
    const formData = await request.formData();
    const userId = formData.get("userId") as string;
    const name = formData.get("name") as string;
    const date = formData.get("date") as string;
    const about = formData.get("about") as string;
    const picture = formData.get("picture") as File;
    const pictures = formData.getAll("pictures");

    const { id: coupleId } = await prisma.couple.findFirstOrThrow({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    await removeImage(coupleId, "principal");
    await removeImage(coupleId, "gallery");

    let pictureUrl = "";
    pictureUrl = await updateImage(coupleId, "principal", picture);

    await prisma.couple.update({
      where: { id: coupleId },
      data: {
        picture: pictureUrl,
        name,
        date,
        about,
      },
    });

    // Deleting all data by coupleId
    await prisma.picture.deleteMany({
      where: {
        coupleId,
      },
    });

    // Creating new data by coupleId
    await Promise.all(
      pictures.map(async (file) => {
        if (file instanceof File) {
          try {
            const imageUrl = await updateImage(coupleId, "gallery", file);

            await prisma.picture.create({
              data: {
                name: file.name,
                url: imageUrl,
                coupleId,
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

    // const { id: coupleId } = await prisma.couple.create({
    //   data: {
    //     name,
    //     date,
    //     about,
    //     userId,
    //   },
    // });

    // const pictureUrl = "";

    // if (picture) {
    //   pictureUrl = await updateImage(coupleId, "principal", picture);
    // }

    // await prisma.couple.update({
    //   where: { id: coupleId },
    //   data: {
    //     picture: pictureUrl,
    //   },
    // });

    // const pictures = formData.getAll("pictures");

    // await Promise.all(
    //   pictures.map(async (file) => {
    //     if (file instanceof File) {
    //       try {
    //         const imageUrl = await updateImage(coupleId, "gallery", file);

    //         await prisma.picture.create({
    //           data: {
    //             name: file.name,
    //             url: imageUrl,
    //             coupleId,
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

    // const pageLink = `${baseUrl}/${coupleId}`;

    // await prisma.couple.update({
    //   where: {
    //     id: coupleId,
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "getPage") {
    return await getPage(request);
  }

  if (action === "getPageDetails") {
    return await getPageDetails(request);
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
  } catch (error) {
    console.error("Error generating page:", error);

    return NextResponse.json(
      {
        type: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
