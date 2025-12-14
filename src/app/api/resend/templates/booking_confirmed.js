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
    Tailwind
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
    footer
} from './styles'

import { useTranslation } from "@/app/i18n";


export const booking_confirmed_subject = `Reserva Hueco aprobada`;

export const BookingConfirmed = async (book_id, lang) => {

    const { t } = await useTranslation(lang)

    return (
        <Html>
            <Head />
            <Preview>{t('email_book_confirmed_1')}</Preview>
            <Tailwind>
                <Body style={main}>
                    <Container style={container}>
                        <Section style={box}>
                            <Img
                                src={`https://blog.tieneshueco.com/wp-content/uploads/2024/01/logo.png`}
                                height="21"
                                alt="Stripe"
                            />
                            <Hr style={hr} />
                            <Text className="text-gray-900 text-xl font-semibold">{t('email_book_confirmed_2')}</Text>
                            <Text className="text-gray-500 font-light uppercase">{t('email_book_confirmed_3')} #{book_id.padStart(5, '0')}</Text>
                            <Text style={paragraph}>
                                {t('email_book_confirmed_4')}
                            </Text>

                            <Button style={button} href={process.env.BASE_URL + "/es/contract/" + book_id}>
                                {t('email_book_confirmed_5')}
                            </Button>

                            <Text style={paragraph}>— {t('email_common_team')}</Text>
                            <Hr style={hr} />
                            <Text style={footer}>
                                {t('email_common_address')}
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
};

export default BookingConfirmed;
