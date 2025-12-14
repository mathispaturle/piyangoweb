import { NextResponse } from "next/server"

import { SendMail } from './resend'

export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(request) {

    const url = new URL(request.url)

    const data = await SendMail(url)

    console.log(data)

    return NextResponse.json({
        data
    })

    if (data?.error != null) {
        return NextResponse.json(
            {
                name: data?.error.name,
                message: data?.error.message
            },
            {
                status: data?.error.statusCode
            }
        )
    }

    return NextResponse.json(
        {
            id: data.data.id
        },
        {
            status: 200
        }
    );
}