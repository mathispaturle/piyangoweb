import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

import {
    main,
    container,
    box,
    hr,
    paragraph,
    anchor,
    button,
    footer,
} from "./styles";


import axios from "axios";
export const ticketPurchasedSubject = (raffleTitle) => {
    return `🎟️ Confirmación de tus boletos – ${raffleTitle}`;
};

export const PiyangoTicketPurchasedEmail = async (raffleTitle, raffleId, tickets, totalPrice) => {

    return (
        <Html>
            <Head />
            <Preview>
                Tu participación en “{raffleTitle}” ha sido confirmada 🎉
            </Preview>

            <Tailwind>
                <Body style={main}>
                    <Container style={container}>
                        <Section style={box}>
                            {/* Logo */}
                            <Img
                                src={`https://www.piyango.es/logo 2.png`}
                                height="24"
                                alt="Piyango"
                            />

                            <Hr style={hr} />

                            {/* Title */}
                            <Text className="text-gray-900 text-xl font-semibold">
                                ¡Boletos confirmados!
                            </Text>

                            <Text className="text-gray-500 font-light uppercase">
                                Rifa: {raffleTitle}
                            </Text>

                            <Text style={paragraph}>
                                Tu compra se ha realizado correctamente. Ya estás participando
                                en la siguiente rifa:
                            </Text>

                            {/* Raffle info */}
                            <Text style={paragraph} className="font-semibold">
                                🎁 {raffleTitle}
                            </Text>

                            <Hr style={hr} />

                            {/* Tickets */}
                            <Text style={paragraph} className="font-semibold">
                                🎟️ Tus boletos
                            </Text>

                            <Text style={paragraph}>
                                {tickets.split(",").map((ticket) => (
                                    <Text style={paragraph}>{ticket}</Text>
                                ))}
                            </Text>

                            <Text style={paragraph}>
                                💰 Total pagado:{" "}
                                <span className="font-semibold">
                                    {(totalPrice / 100).toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                                </span>
                            </Text>

                            {/* CTA */}
                            <Button
                                style={button}
                                href={`${process.env.BASE_URL}/raffles/${raffleId}`}
                            >
                                Ver rifa
                            </Button>

                            <Hr style={hr} />

                            {/* Legal / Support */}
                            <Text style={paragraph}>
                                Guarda este correo como comprobante de tu participación.
                            </Text>

                            <Text style={paragraph}>
                                Si tienes cualquier duda, puedes escribirnos a{" "}
                                <Link style={anchor} href="mailto:soporte@piyango.app">
                                    hola@piyango.app
                                </Link>
                                .
                            </Text>

                            <Text style={paragraph}>
                                ¡Mucha suerte! 🍀
                            </Text>

                            <Text style={paragraph}>— El equipo de Piyango</Text>

                            <Hr style={hr} />

                            <Text style={footer}>
                                © {new Date().getFullYear()} Piyango · Todos los derechos reservados
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default PiyangoTicketPurchasedEmail;
