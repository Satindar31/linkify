import { UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import LinkLoading from "./loading";
import NoLinks from "@/compnents/dashboard/noLinks";
import ExistingLinks from "@/compnents/dashboard/existingLinks";

export default async function Dashboard() {
  const response = await fetch(process.env.URL + "/api/getLinks", {
    method: "GET",
  });
  const data = await response.json();

  return (
    <div className="h-screen overflow-hidden overflow-x-hidden overflow-y-hidden">
      <UserButton afterSignOutUrl="/" />
      {data == 0 ? <NoLinks /> : <ExistingLinks />}
    </div>
  );
}
