import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/mailer";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const email = searchParams.get("email");
        const name = searchParams.get("name") ?? undefined;

        if (!email) {
            return NextResponse.json(
                { error: "email is required" },
                { status: 400 }
            );
        }

        await sendWelcomeEmail(email, name);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("WELCOME EMAIL ERROR:", error);
        return NextResponse.json(
            { error: "Failed to send welcome email" },
            { status: 500 }
        );
    }
}
