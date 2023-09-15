"use client"

import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function NotFound() {
    fetch(process.env.URL + "/api/notfound")
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-7xl font-bold m-2">Hmm, thats odd</h1>
            <p className="text-xl m-2">The requested page could not be found</p>
            <div className="flex flex-row gap-6 m-2">
                <Link href={"/"}><Button>Go Home</Button></Link>
                <Button onClick={() => window.history.go(-1)} variant="bordered">Go back</Button>
            </div>
        </div>
    )
}