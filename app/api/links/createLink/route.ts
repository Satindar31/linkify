import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();
import crypto from "crypto";
import { currentUser } from "@clerk/nextjs";

import { log } from '@logtail/next';

export async function POST(req: NextRequest) {
  console.log("/createLink");
  const user = await currentUser();
  const {
    URL,
    name,
    description,
  }: { URL: string; name: string; description: string | undefined } =
    await req.json();
  if (!URL || !name) {
    log.error("No URL/NAME provided");
    return new Response(JSON.stringify({ error: "No URL/NAME provided" }), {
      status: 400,
    });
  }
  const assignedEnding = crypto.randomBytes(4).toString("hex");

  try {
    if (!user?.emailAddresses[0].emailAddress || !user.primaryEmailAddressId)
      return new Response(JSON.stringify({ error: "No email ID" }));
    const newLink = await prisma.link.create({
      data: {
        assignedEnding: assignedEnding,
        url: URL,
        email:
          user?.emailAddresses[0].emailAddress.toString() ??
          user?.primaryEmailAddressId?.toString(),
        name: name,
        description: description,
      },
    });
    return new Response(JSON.stringify(newLink), { status: 201 });
  } catch (err: any) {
    log.error(err.message, { error: err })
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  } finally {
    log.flush()
    prisma.$disconnect();
  }
}
