import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleSlug: slug,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const { content, userEmail } = await request.json();

  if (!content || !userEmail) {
    return NextResponse.json({ error: 'Content and userEmail are required' }, { status: 400 });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        userEmail,
        articleSlug: slug,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating comment' }, { status: 500 });
  }
}
