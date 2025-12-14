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

export const welcome_hueco = `Bienvenido a Piyango`;

export const WelcomeHueco = async (lang) => {

    return (
        <Html>
            <Head />
            <Preview>Preview text</Preview>
            <Tailwind>
                <Body style={main}>
                    <Container style={container}>
                        <Section style={box}>
                            <Img
                                src={`https://www.piyango.es/logo.svg`}
                                height="21"
                                alt="Piyango"
                            />
                            <Hr style={hr} />
                            <Text className="text-gray-900 text-xl font-semibold">¡Bienvenido a Piyango!</Text>
                            <Text style={paragraph}>
                                Ya formas parte de una plataforma donde participar en rifas es simple, transparente y seguro.
                            </Text>
                            <Text style={paragraph}>
                                Desde ahora podrás:

                                <br />
                                🎟️ Participar en rifas activas en pocos segundos
                                <br />

                                🧾 Consultar tus boletos y participaciones
                                <br />

                                🏆 Seguir los sorteos y resultados en tiempo real
                                <br />
                                <br />

                                Cada participación cuenta y todo está pensado para que tengas una experiencia clara y justa.
                                <br />
                                <br />

                                Si tienes cualquier duda o sugerencia, puedes responder directamente a este correo.
                                Estamos aquí para ayudarte.
                            </Text>


                            <Hr style={hr} />

                            <Text style={paragraph}>
                                Te deseamos mucha suerte 🍀
                            </Text>


                            <Text style={paragraph}>— El equipo de Piyango</Text>

                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
};

export default WelcomeHueco;
