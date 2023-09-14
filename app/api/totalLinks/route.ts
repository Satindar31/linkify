import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
    console.log("totalLinks")
    const user = await currentUser()
    try {

        const totalLinks = await prisma.link.findMany({
            where: {
                email: user?.emailAddresses[0].emailAddress.toString() ?? "no email",
            }
        })
        // console.log(totalLinks)
        return new Response(JSON.stringify({ totalLinks }), { status: 200 })
    }
    catch(err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 })
    }
    finally {
        await prisma.$disconnect()
    }


}