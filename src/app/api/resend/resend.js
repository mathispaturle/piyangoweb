
// Templates
import { ticketPurchasedSubject, PiyangoTicketPurchasedEmail } from './templates/book_paid';
// import { notify_host_new_booking_subject, NotifyHostNewBooking } from './templates/notify_host_new_booking';
// import { booking_confirmed_subject, BookingConfirmed } from './templates/booking_confirmed';
// import { booking_lead_confirmed_subject, BookingLeadConfirmed } from './templates/booking_lead_confirmation';
// import { reset_password_subject, ResetPassword } from './templates/reset_password';
import { welcome_hueco, WelcomeHueco } from './templates/welcome_hueco';
// import { upload_success, UploadSuccess } from './templates/upload_success';
// import { validation_space, ValidationSpace } from './templates/validation_space';
// import { reject_space, RejectSpace } from './templates/reject_space'
// import { factura_host, FacturaHost } from './templates/factura_host'
// import { book_active_client_subject, BookActiveClient } from './templates/book_active_client'
// import { book_active_host_subject, BookActiveHost } from './templates/book_active_host'

import { createEmail } from './server_action'

export async function SendMail(url) {

    const email_type = url.searchParams.get("email_type")
    const email_to = url.searchParams.get("email_to")
    let lang = url.searchParams.get("lang")

    lang = lang == null ? 'es' : lang

    const email_data = await GetEmailData(email_type, url, lang)

    console.log(email_data)

    return await createEmail(email_to, email_data)
}

async function GetEmailData(email_type, url, lang) {

    switch (email_type) {
        case "raffle_paid": {
            // const book_id = url.searchParams.get("book_id")
            // const user_token = url.searchParams.get("user_token")



            let title = ticketPurchasedSubject("raffleTitle")
            let email = await PiyangoTicketPurchasedEmail()

            return {
                subject: title,
                email: email
            }
        }

        // case "booking_paid_host": {
        //     const book_id = url.searchParams.get("book_id")

        //     let email = await NotifyHostNewBooking(book_id, lang)

        //     return {
        //         subject: notify_host_new_booking_subject,
        //         email: email
        //     }
        // }

        // case "booking_confirmed": {
        //     const book_id = url.searchParams.get("book_id")

        //     let email = await BookingConfirmed(book_id, lang)

        //     return {
        //         subject: booking_confirmed_subject,
        //         email: email
        //     }
        // }

        // case "reset_password": {
        //     const hash = url.searchParams.get("hash")

        //     let email = await ResetPassword(hash, lang)

        //     return {
        //         subject: reset_password_subject,
        //         email: email
        //     }
        // }

        case 'welcome': {

            let email = await WelcomeHueco(lang)

            return {
                subject: welcome_hueco,
                email: email
            }
        }

        // case 'upload_success': {

        //     const location_id = url.searchParams.get("location_id")

        //     let email = await UploadSuccess(location_id, lang, process.env.BASE_URL)

        //     return {
        //         subject: upload_success,
        //         email: email
        //     }
        // }

        // case 'validation_space': {

        //     const location_id = url.searchParams.get("location_id")
        //     const location_name = url.searchParams.get("location_name")

        //     let email = await ValidationSpace(location_id, location_name, lang, process.env.BASE_URL)

        //     return {
        //         subject: validation_space,
        //         email: email
        //     }
        // }

        // case 'reject_space': {

        //     const location_id = url.searchParams.get("location_id")
        //     const location_name = url.searchParams.get("location_name")
        //     const reason = url.searchParams.get("reason")

        //     let email = await RejectSpace(location_id, location_name, reason, lang, process.env.BASE_URL)

        //     return {
        //         subject: reject_space,
        //         email: email
        //     }
        // }

        // case 'host_invoice': {

        //     const name = url.searchParams.get("name")
        //     const amount = url.searchParams.get("amount")
        //     const date = url.searchParams.get("date")
        //     const lines = JSON.parse(url.searchParams.get("lines"))

        //     let email = await FacturaHost(name, amount, date, lines, lang, process.env.BASE_URL)

        //     return {
        //         subject: factura_host,
        //         email: email
        //     }
        // }

        // case 'book_lead_confirmation': {

        //     const detail = url.searchParams.get("detail")
        //     const image = url.searchParams.get("image")

        //     // Has solicitado información del despacho privado para 10 personas por 200€/mes (si consider_capacity) añadir por persona
        //     // Foto del espacio

        //     let email = await BookingLeadConfirmed(detail, image, lang)

        //     return {
        //         subject: booking_lead_confirmed_subject,
        //         email: email
        //     }
        // }

        // case 'book_active_client': {

        //     const book_id = url.searchParams.get("book_id")

        //     let title = await book_active_client_subject(book_id, lang)
        //     let email = await BookActiveClient(book_id, lang)

        //     return {
        //         subject: title,
        //         email: email
        //     }
        // }

        // case 'book_active_host': {

        //     const book_id = url.searchParams.get("book_id")

        //     let title = await book_active_host_subject(book_id, lang)
        //     let email = await BookActiveHost(book_id, lang)

        //     return {
        //         subject: title,
        //         email: email
        //     }
        // }
    }
}




