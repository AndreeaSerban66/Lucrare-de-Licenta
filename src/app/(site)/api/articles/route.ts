import { NextResponse } from "next/server";
import prisma from "@/app/lib/connect";
import { getAuthSession } from "@/app/lib/auth";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const GET = async () => {
  try {
    const articles = await prisma.article.findMany();
    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated!" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const slug = generateSlug(body.title);

    const article = await prisma.article.create({
      data: { ...body, slug },
    });

    return NextResponse.json({ article }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};
