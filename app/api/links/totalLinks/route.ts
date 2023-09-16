import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { log } from '@logtail/next';

export async function GET() {
    console.log("totalLinks")
    const user = await currentUser()
    if(!user?.primaryEmailAddressId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 } )
    try {

        const totalLinks = await prisma.link.findMany({
            where: {
                email: user?.emailAddresses[0].emailAddress.toString() ?? user?.primaryEmailAddressId?.toString(),
            }
        })
        
        return new Response(JSON.stringify({ totalLinks }), { status: 200 })
    }
    catch(err: any) {
        log.error(err.message, { error: err })
        return new Response(JSON.stringify({ error: err.message }), { status: 500 })
    }
    finally {
        log.flush()
        await prisma.$disconnect()
    }


}