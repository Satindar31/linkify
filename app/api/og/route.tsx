import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "7rem",
            textAlign: "center",
            fontWeight: "bold",
            margin: "0",
            padding: "0",
          }}
        >
          Shorten Links
          <br /> Quickly
        </h1>
      </div>
    )
  );
}
