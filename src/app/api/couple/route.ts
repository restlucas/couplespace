import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/utils/upload-image";

async function getCouple(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { type: "error", message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const page = await prisma.couple.findFirst({
      where: {
        userId,
      },
      select: {
        id: true,
        link: true,
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

async function getCoupleDetails(request: Request) {
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
          },
        },
        songs: {
          select: {
            id: true,
            url: true,
          },
        },
        pictures: {
          select: {
            id: true,
            url: true,
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "getCouple") {
    return await getCouple(request);
  }

  if (action === "getCoupleDetails") {
    return await getCoupleDetails(request);
  }

  return NextResponse.json(
    { type: "error", message: "Invalid action" },
    { status: 400 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL;
    const formData = await request.formData();

    const userId = formData.get("userId") as string;
    const name = formData.get("name") as string;
    const date = formData.get("date") as string;
    const about = formData.get("about") as string;
    const picture = formData.get("picture") as File;

    let pictureUrl = "";
    if (picture) {
      pictureUrl = await uploadImage(picture); // Faz o upload da imagem e obtém a URL
    }

    const { id: coupleId } = await prisma.couple.create({
      data: {
        name,
        date,
        about,
        picture: pictureUrl,
        userId,
      },
    });

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
    });
  } catch (error) {
    console.error("Error generating page:", error);
    return NextResponse.json(
      { type: "error", message: "Error generating page" },
      { status: 500 }
    );
  }
}
