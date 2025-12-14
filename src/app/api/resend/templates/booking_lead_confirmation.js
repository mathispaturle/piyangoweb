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
    footer,
    imageStyle
} from './styles'

import { useTranslation } from "@/app/i18n";


export const booking_lead_confirmed_subject = `Tu solicitud de reserva ha sido registrada`;

export const BookingLeadConfirmed = async (detail, image, lang) => {

    const { t } = await useTranslation(lang)

    return (
        <Html>
            <Head />
            <Preview>{t('email_book_lead_confirmed_1')}</Preview>
            <Tailwind>
                <Body style={main}>
                    <Container style={container}>
                        <Section style={box}>
                            <Img
                                src={`https://blog.tieneshueco.com/wp-content/uploads/2024/01/logo.png`}
                                height="21"
                                alt="Hueco"
                            />
                            <Hr style={hr} />
                            <Text className="text-gray-900 text-xl font-semibold">{t('email_book_lead_confirmed_2').replace("{{value}}", detail)}</Text>
                            <Img src={image} alt="Espacio Hueco" style={imageStyle} />

                            <Hr style={hr} />

                            <Button style={button} href={process.env.BASE_URL + "/es/s"}>
                                {t('email_book_lead_confirmed_3')}
                            </Button>

                            <Text style={paragraph}>
                                {t('email_book_lead_confirmed_4')}
                            </Text>

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

export default BookingLeadConfirmed;
