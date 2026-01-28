
import axios from "axios";


export const checkResponseStatus = async (result: any, email: string | null, raffleId: string, raffleTitle: string | null) => {
    // If insufficient funds
    if (!result.success && result.reason === 'INSUFFICIENT_FUNDS') {
        return JSON.stringify({
            success: false,
            reason: 'INSUFFICIENT_FUNDS',
            message: 'Not enough balance to buy tickets',
        })
    }

    // If any other handled business failure
    if (!result.success) {
        return JSON.stringify({
            success: false,
            reason: result.reason || 'UNKNOWN',
            message:
                'message' in result && typeof (result as any).message === 'string'
                    ? (result as any).message
                    : 'Transaction failed',
        })
    }


    await sendEmail(result.tickets, result.totalCost, email, raffleId, raffleTitle)

    return JSON.stringify(
        {
            success: true,
            message: 'Transaction successful',
            response: result,
        }
    )
}

const sendEmail = async (tickets: any, totalCost: any, email: string | null, raffleId: string, raffleTitle: string | null) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const _url = `${baseUrl}/api/resend?email_type=raffle_paid&lang=es&email_to=${email}&tickets=${tickets.join(",")}&totalPrice=${totalCost}&raffleId=${raffleId}&raffleTitle=${raffleTitle}`;
    await axios.post(_url, null, {
        params: {
            "email_type": "raffle_paid",
            "lang": "es",
            "email_to": email,
            "tickets": tickets.join(","),
            "totalPrice": totalCost,
            "raffleId": raffleId,
            "raffleTitle": raffleTitle
        }
    });
}