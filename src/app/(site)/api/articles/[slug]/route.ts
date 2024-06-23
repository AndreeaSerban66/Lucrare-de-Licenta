import { NextResponse } from "next/server";
import prisma from "@/app/lib/connect";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        comments: true, 
      },
    });

   
    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }

    
    return NextResponse.json(article, { status: 200 });
  } catch (err) {
    console.error(err);

 
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }

    await prisma.article.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Article deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}