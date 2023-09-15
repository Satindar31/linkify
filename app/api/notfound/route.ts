import { Logtail } from "@logtail/node";
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN ?? "");

export function GET() {
    logtail.error({
        name: "404 Error",
        message: "A user tried to access a page that does not exist.",
        cause: "User tried to access a page that does not exist."
    })
    return new Response(JSON.stringify({ error: "Error Reported" }), {
        status: 200,
    });
}