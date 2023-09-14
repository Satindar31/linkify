import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import React, { Suspense } from "react";

/**
 * @interface Ilink
 * @description Interface for the link object
 * @param assignedEnding - The ending of the link
 * @param id - The id of the link
 * @param url - The url of the link
 * @param created - The date the link was created
 * @param updated - The date the link was updated
 * @param email - The email of the user who created the link
 * @param name - The name of the link
 * @param description - The description of the link
 * @param totalClicks - The total clicks of the link
 */
interface Ilink {
  assignedEnding: string;
  id: number;
  url: string;
  created: Date;
  updated: Date;
  email: string;
  name: string;
  description: string;
  totalClicks: number;
}

export default async function ExistingLinks() {
  const response = await fetch(process.env.URL + "/api/totalLinks");
  const data: any = await response.json();
  const links: Ilink[] = data.totalLinks;
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {links &&
          links.map &&
          links.map((link) => (
            <React.Fragment key={link.id}>
              <Card className="m-4">
                <CardBody className="grid grid-cols-3">
                  <p className="font-semibold">{link.name}</p>
                  <p>{link.totalClicks}</p>
                  <Image
                    height={100}
                    width={200}
                    alt=""
                    src={"/public/vercel.svg"}
                  />
                </CardBody>
              </Card>
            </React.Fragment>
          ))}
      </Suspense>
    </>
  );
}
