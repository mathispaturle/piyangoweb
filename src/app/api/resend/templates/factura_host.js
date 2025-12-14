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
    Column,
    Row
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
    row_max,
    row_min
} from './styles'

import { useTranslation } from "@/app/i18n";

export const factura_host = `Tu factura de Hueco`;

export const FacturaHost = async (host_name, amount, date, lines, lang, base_url) => {

    const { t } = await useTranslation(lang)

    return (
        <Html>
            <Head />
            <Preview>Tu factura Hueco está disponible</Preview>
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
                            <Text style={paragraph}>Estimad@ {host_name},</Text>
                            <Text style={paragraph}>
                                Te traemos buenas notícias: ¡Con Hueco, has generado una rentabilidad de <b>{amount}€</b> por los espacios de vuestra oficina!
                            </Text>

                            <Text style={paragraph}>
                                Aquí tienes el desglose de los clientes y los importes correspondientes:
                            </Text>

                            <Hr style={hr} />

                            <Row className="mb-4">
                                <Column style={row_max}><b>Cliente</b></Column>
                                <Column style={row_min}><b>Tú ganas</b></Column>
                                <Column style={row_min}><b>Total</b></Column>
                            </Row>

                            {
                                lines.map((line, index) => (
                                    <Row key={index}>
                                        <Column style={row_max}>{line.customer}</Column>
                                        <Column style={row_min}>{line.amount}€ + IVA</Column>
                                        <Column style={row_min}>{line.total_amount}€ + IVA</Column>
                                    </Row>
                                ))
                            }

                            <Hr style={hr} />

                            <Text style={paragraph}>
                                Para garantizar una gestión eficiente, te pedimos que nos envíes la factura antes de final de mes.
                                De este modo, podremos procesar el pago antes del día 5 del próximo mes.
                            </Text>

                            <Button style={button} href={base_url + "/" + lang + "/hosting/billing/" + date}>
                                Sube tu factura aquí
                            </Button>

                            <Text style={paragraph}>
                                Agradecemos tu colaboración continua y estamos muy contentos de seguir trabajando juntos. <br />
                                Si surge alguna duda o sugerencia, no dudes en ponerte en contacto con nosotros.
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

export default FacturaHost;
