import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
export const runtime = 'nodejs'; // ensure Node runtime

import { Resend } from 'resend';

// import StripeWelcomeEmail from './email';
// import tailwindConfig from '../tailwind.config';

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

import { Email } from './email'


export async function GET() {
    const resend = new Resend(process.env.RESEND);

    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "mathispaturle@gmail.com",
            subject: "Test Email",
            react: Email,
        });

        console.log(data)
        return NextResponse.json({ ok: true, data });
    } catch (err) {
        console.error("SEND ERROR:", err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}