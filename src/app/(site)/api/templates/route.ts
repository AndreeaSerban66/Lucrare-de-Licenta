import { NextResponse } from 'next/server';
import prisma from '@/app/lib/connect';

export async function GET() {
  try {
    const templates = await prisma.template.findMany();
    return NextResponse.json(templates, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, thumbnail, pdfFile } = body;
    const newTemplate = await prisma.template.create({
      data: {
        title,
        thumbnail,
        pdfFile,
      },
    });
    return NextResponse.json(newTemplate, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({ message: 'Allowed methods: GET, POST' }, { status: 204 });
}
