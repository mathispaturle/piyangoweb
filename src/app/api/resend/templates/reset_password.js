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

export const reset_password_subject = `Restablece tu contraseña de Hueco`;

export const ResetPassword = async (hash, lang) => {

    const { t } = await useTranslation(lang)

    return (
        <Html>
            <Head />
            <Preview>{t('email_password_link_1')}</Preview>
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
                            <Text className="text-gray-900 text-xl font-semibold">{t('email_password_link_2')}</Text>
                            <Text style={paragraph}>
                                {t('email_password_link_3')}
                            </Text>

                            <Button style={button} href={`${process.env.BASE_URL}/${lang}/reset-password?token=${hash}`}>
                                {t('email_password_link_4')}
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

export default ResetPassword;
