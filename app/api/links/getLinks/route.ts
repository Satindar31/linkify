import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



import { log } from '@logtail/next';

export async function GET() {
  const user = await currentUser();

  try {
    const links = await prisma.link.findMany({
      where: {
        email: user?.emailAddresses[0].emailAddress.toString() ?? user?.primaryEmailAddressId?.toString(),
      },
    });

    return new Response(JSON.stringify({ links }), { status: 200 });
  } catch (err: any) {
    const e = log.error(err.message, { error: err });
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  } finally {
    log.flush()
    await prisma.$disconnect();
  }
}
