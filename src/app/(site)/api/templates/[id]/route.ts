import { NextResponse } from "next/server";
import prisma from "@/app/lib/connect";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const template = await prisma.template.findUnique({
      where: { id: parseInt(id) },
    });

    if (!template) {
      return NextResponse.json({ message: "Template not found" }, { status: 404 });
    }

    await prisma.template.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Template deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
