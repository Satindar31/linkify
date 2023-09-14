import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <main className="flex min-h-screen flex-col items-center justify-between p-40">
        <h1 className="text-center text-7xl text-white font-bold">
          Shorten Links
          <br /> Quickly
        </h1>
      </main>
    )
  );
}
