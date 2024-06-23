import { NextResponse } from "next/server";
import prisma from "@/app/lib/connect";
import { getAuthSession } from "@/app/lib/auth";

export const GET= async () => {
    try {
      const latestArticle = await prisma.article.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      if (!latestArticle) {
        return NextResponse.json({ message: "No articles found" }, { status: 404 });
      }
  
      return NextResponse.json(latestArticle, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  };