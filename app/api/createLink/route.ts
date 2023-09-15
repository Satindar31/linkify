import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();
import crypto from "crypto";
import { currentUser } from "@clerk/nextjs";

import { Logtail } from "@logtail/node";
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN ?? "");

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
    logtail.error({
      name: "Missing value while creating link",
      message:
        "Either the URL or Name where not recieved in the request body while trying to create a link for email: " +
        (user?.primaryEmailAddressId ?? user?.emailAddresses[0].emailAddress),
        cause: "Missing values"
    });
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
    logtail.error({
      message: err.message,
      name: "Unknown error while creating link.",
      cause: {
        error: err,
        checklist: "Is the database running. Check vercel console. Check for missing enviorment variables. Check BetterUptime"
      },
    })
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  } finally {
    logtail.flush()
    prisma.$disconnect();
  }
}
