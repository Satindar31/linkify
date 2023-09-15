import { SignIn, UserButton, currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import LinkLoading from "./loading";
import NoLinks from "@/compnents/dashboard/noLinks";
import ExistingLinks from "@/compnents/dashboard/existingLinks";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) return <SignIn redirectUrl={"/dashboard"} />;
  const response = await fetch(process.env.URL + "/api/getLinks", {
    method: "GET",
  });
  const data = await response.json();

  return (
    <div className="h-screen overflow-hidden overflow-x-hidden overflow-y-hidden">
      <Suspense fallback={<LinkLoading />}>
        <UserButton afterSignOutUrl="/" />
        {data == 0 ? <NoLinks /> : <ExistingLinks />}
      </Suspense>
    </div>
  );
}
