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

export const reject_space = `Tu anuncio ha sido rechazado.`;

export const RejectSpace = async (location_id, location_name, reason, lang, base_url) => {

    const { t } = await useTranslation(lang)

    return (
        <Html>
            <Head />
            <Preview>{t('email_upload_success_1')}</Preview>
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
                            <Text className="text-gray-900 text-xl font-semibold">{t('email_validation_reject_1')}</Text>
                            <Text style={paragraph}>
                                {t('email_validation_reject_2').replace('{{location}}', location_name)}
                            </Text>

                            <Text style={paragraph}>
                                {reason}
                            </Text>

                            <Button style={button} href={base_url + "/" + lang + "/hosting/listings/" + location_id}>
                                {t('email_validation_reject_3')}
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

export default RejectSpace;
