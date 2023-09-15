import { currentUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import CreditsModal from '@/components/home/creditsModal'

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-40">
      <h1 className="text-center text-7xl text-white font-bold">
        Shorten Links
        <br /> Quickly
      </h1>
      <div className="flex flex-row gap-4">
        {user ? (
          <Link href={"/dashboard"}>
            <Button size="lg" variant="solid">Dashboard</Button>
          </Link>
        ) : (
          <Link href={"/signup"}>
            <Button size="lg">Get started</Button>
          </Link>
        )}
        <Button size="lg" variant="bordered">Learn More</Button>
      </div>
      <CreditsModal />
    </main>
  );
}
