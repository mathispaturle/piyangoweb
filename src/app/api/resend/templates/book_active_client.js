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

export const book_active_client_subject = async (book_id, lang) => {
    const { t } = await useTranslation(lang)
    const title = t('email_book_active_title_client').replace("{{value}}", `#${book_id.padStart(5, '0')}`)
    return title
};

export const BookActiveClient = async (book_id, lang) => {

    const { t } = await useTranslation(lang)

    return (
        <Html>
            <Head />
            <Preview>{t('email_book_active_1_client')}  {t('email_book_active_2_client')}</Preview>
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
                            <Text className="text-gray-900 text-xl font-semibold">{t('email_book_active_3_client')}</Text>
                            <Text className="text-gray-500 font-light uppercase">{t('email_book_active_4_client')} #{book_id.padStart(5, '0')}</Text>
                            <Text style={paragraph}>
                                {t('email_book_active_5_client')}
                            </Text>
                            <Text style={paragraph}>
                                {t('email_book_active_6_client')}
                            </Text>
                            <Button style={button} href={process.env.BASE_URL + "/es/bookings/" + book_id}>
                                {t('email_book_active_7_client')}
                            </Button>
                            <Hr style={hr} />
                            <Text style={paragraph}>
                                {t('email_book_active_8_client')} {" "}
                                <Link style={anchor} href={process.env.BASE_URL + "/es/contract/" + book_id}>
                                    {t('email_book_active_9_client')}
                                </Link>{" "}
                            </Text>
                            <Text style={paragraph}>
                                {t('email_book_active_10_client')} {" "}
                                <Link
                                    style={anchor}
                                    href="mailto:info@tieneshueco.com"
                                >
                                    {t('email_book_active_11_client')}
                                </Link>{" "}
                                {t('email_book_active_12_client')}
                            </Text>
                            <Text style={paragraph}>
                                {t('email_book_active_13_client')}
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
        </Html>)
};

export default BookActiveClient;
