import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();
import crypto from "crypto";
import { currentUser } from "@clerk/nextjs";

export async function POST(req: NextRequest) {
  console.log("ran")
  const { URL, name, description }: { URL: string, name: string, description: string | undefined } = await req.json();
  if (!URL || !name)
    return new Response(JSON.stringify({ error: "No URL/NAME provided" }), {
      status: 400,
    });
  const assignedEnding = crypto.randomBytes(4).toString("hex");
  const user = await currentUser();

  try {
    const newLink = await prisma.link.create({
      data: {
        assignedEnding: assignedEnding,
        url: URL,
        email: user?.emailAddresses[0].emailAddress ?? "no email",
        name: name,
        description: description,
      },
    });
    return new Response(JSON.stringify(newLink), { status: 201 });
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
  finally {
    prisma.$disconnect();
  }
}
