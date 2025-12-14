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
import GetBookingDetail from '@/app/api/v3/dashboard/universal/get_booking_detail'

export const stripe_subject = async (book_id, lang) => {
    const { t } = await useTranslation(lang)
    const title = t('email_book_subject_book_paid').replace("{{value}}", `#${book_id.padStart(5, '0')}`)
    return title
};

export const StripeWelcomeEmail = async (book_id, lang, user_token) => {

    const { t } = await useTranslation(lang)

    let booking_data = await GetBookingDetail({ booking_id: book_id }, user_token).catch((error) => {
        console.log(error)
    });
    const booking = booking_data.bookings


    return (
        <Html>
            <Head />
            <Preview>{t('email_book_paid_1')} #{book_id.padStart(5, '0')} {t('email_book_paid_2')}</Preview>
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
                            <Text className="text-gray-900 text-xl font-semibold">{t('email_book_paid_3')}</Text>
                            <Text className="text-gray-500 font-light uppercase">{t('email_book_paid_4')} #{book_id.padStart(5, '0')}</Text>
                            <Text style={paragraph}>
                                {t('email_book_paid_5')}
                            </Text>
                            <Text style={paragraph}>
                                {t('email_book_paid_6')}
                            </Text>
                            <Button style={button} href={process.env.BASE_URL + "/es/bookings/" + book_id}>
                                {t('email_book_paid_7')}
                            </Button>
                            <Hr style={hr} />

                            {
                                booking.booking_bail != null && parseInt(booking.booking_bail?.bail_cost) > 0 &&
                                <>
                                    <Text style={paragraph}>
                                        {t('email_book_paid_bail')}
                                    </Text>

                                    <Text style={paragraph} className="font-semibold">
                                        {t('bail_information_title')}
                                    </Text>

                                    <Text style={paragraph}>
                                        {t('bail_information_account')}: <span className="font-semibold">ES8600810200290004175825</span>
                                    </Text>
                                    <Text style={paragraph}>
                                        {t('bail_information_qty')}: <span className="font-semibold">{parseFloat(booking.booking_bail.bail_cost).toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span>
                                    </Text>
                                    <Text style={paragraph}>
                                        {t('bail_information_concept')}: <span className="font-semibold">{t('bail_information_concept_data').replace("{{value}}", `#${String(booking.id).padStart(5, "0")}`)}</span>
                                    </Text>
                                    <Text style={paragraph}>
                                        {t('bail_information_benef')}: <span className="font-semibold">Tribu App Barcelona S.L</span>
                                    </Text>

                                    <Button style={button} href={process.env.BASE_URL + "/es/bookings/" + book_id + "?view=bail"}>
                                        {t('email_book_paid_bail_cta')}
                                    </Button>
                                    <Hr style={hr} />
                                </>
                            }


                            <Text style={paragraph}>
                                {t('email_book_paid_10')} {" "}
                                <Link
                                    style={anchor}
                                    href="mailto:info@tieneshueco.com"
                                >
                                    {t('email_book_paid_11')}
                                </Link>{" "}
                                {t('email_book_paid_12')}
                            </Text>
                            <Text style={paragraph}>
                                {t('email_book_paid_13')}
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

export default StripeWelcomeEmail;
