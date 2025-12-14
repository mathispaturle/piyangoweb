'use server'

import { Resend } from 'resend';


export async function createEmail(email_to, email_data) {

    const resend = new Resend(process.env.RESEND);

    const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email_to,
        // bcc: ["mathis@tieneshueco.com", "javi@tieneshueco.com", "info@tieneshueco.com"],
        subject: email_data.subject,
        html: '',
        react: email_data.email
    });

    return data.data
}