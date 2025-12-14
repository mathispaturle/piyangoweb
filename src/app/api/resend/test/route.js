import { NextResponse } from "next/server"

import axios from 'axios'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request) {

    axios.post(process.env.BASE_URL + "/api/resend", null, {
        params: {
            book_id: 14,
            email_to: 'mathis@tieneshueco.com',
            email_type: 'booking_paid'
        }
    }).then(function (response) {
    })
        .catch(function (error) {
            console.log(error);
        });


    return NextResponse.json(
        {
            id: data.data.id
        },
        {
            status: 200
        }
    );
}