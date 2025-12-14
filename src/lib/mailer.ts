import { resend } from "./resend";
import { render } from "@react-email/render";

import WelcomeEmail from "@/emails/WelcomeEmail";
// import TicketPurchasedEmail from "@/emails/TicketPurchasedEmail";

export async function sendWelcomeEmail(
    to: string,
    name?: string
) {
    const html = await render(WelcomeEmail({ name=name });

    return resend.emails.send({
        from: "Piyango <hola@piyango.app>",
        to,
        subject: "Bienvenido a Piyango 🎉",
        html,
    });
}

// export async function sendTicketPurchasedEmail(
//   to: string,
//   data: {
//     raffleTitle: string;
//     ticketNumber: string;
//     price: number;
//     drawDate: string;
//   }
// ) {
//   const html = await render(
//     <TicketPurchasedEmail {...data} />
//   );

//   return resend.emails.send({
//     from: "Piyango <hola@piyango.app>",
//     to,
//     subject: "Tu boleto está confirmado 🎟️",
//     html,
//   });
// }
