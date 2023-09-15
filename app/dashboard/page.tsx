import { SignIn, UserButton, currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import LinkLoading from "./loading";
import NoLinks from "@/components/dashboard/noLinks";
import ExistingLinks from "@/components/dashboard/existingLinks";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) return <SignIn redirectUrl={"/dashboard"} />;
  const response = await fetch(process.env.URL + "/api/getLinks", {
    method: "GET",
  });
  const data = await response.json();

  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto">
      <Suspense fallback={<LinkLoading />}>
        <div className='mt-5 ml-2'>
        <UserButton afterSignOutUrl="/" />
        </div>
        {data == 0 ? <NoLinks /> : <ExistingLinks />}
      </Suspense>
    </div>
  );
}
