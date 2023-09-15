import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const prisma = new PrismaClient()

import { Logtail } from "@logtail/node";
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN ?? "");

export async function DELETE(req: NextRequest) {
    const user = await currentUser()
    if(!user) return new Response("Unauthorized", { status: 401 })
    const { id }: {id: number} = await req.json()

    if(!id) return new Response("Missing id", { status: 400 })

    try {
        await prisma.link.delete({
            where: {
                email: user.primaryEmailAddressId ?? user.emailAddresses[0].emailAddress,
                id: id
            }
        })
    }
    catch(err: any){
        logtail.error({
            message: err,
            name: err.message,
            cause: "Check if the link exists"
        })
        return new Response("Internal Server Error", { status: 500 })
    }
    finally {
        await logtail.flush()
        return new Response("OK", { status: 200 })
    }
}