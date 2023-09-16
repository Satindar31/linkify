import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const prisma = new PrismaClient()

import { log } from '@logtail/next';

export async function DELETE(req: NextRequest) {
    const user = await currentUser()
    if(!user) return new Response("Unauthorized", { status: 401 })
    const { ending }: {ending: string} = await req.json()

    if(!ending) return new Response("Missing ending", { status: 400 })

    try {
        await prisma.link.delete({
            where: {
                assignedEnding: ending
            }
        })

        log.info("Deleted link", { ending })
        return new Response("deleted", { status: 200 })
    }
    catch(err: any){
        log.error(err.message, { error: err })
        return new Response("Internal Server Error", { status: 500 })
    }
    finally {
        log.flush()
        return new Response("OK", { status: 200 })
    }
}