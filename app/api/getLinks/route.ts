import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const user = await currentUser();

  try {
    const links = await prisma.link.findMany({
      where: {
        email: user?.emailAddresses[0].emailAddress.toString() ?? "",
      },
    });
    return new Response(JSON.stringify({ links }), { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
