import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Logtail } from "@logtail/node";
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN ?? "");

export async function GET() {
    console.log("totalLinks")
    const user = await currentUser()
    try {

        const totalLinks = await prisma.link.findMany({
            where: {
                email: user?.emailAddresses[0].emailAddress.toString() ?? user?.primaryEmailAddressId?.toString(),
            }
        })
        // console.log(totalLinks)
        return new Response(JSON.stringify({ totalLinks }), { status: 200 })
    }
    catch(err: any) {
        logtail.error({
            message: err.message,
            name: "Unknown error while creating link.",
            cause: {
              error: err,
              checklist: "Is the database running. Check vercel console. Check for missing enviorment variables. Check BetterUptime"
            },
          })
        return new Response(JSON.stringify({ error: err.message }), { status: 500 })
    }
    finally {
        logtail.flush()
        await prisma.$disconnect()
    }


}