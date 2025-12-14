import {
    Html,
    Head,
    Preview,
    Body,
    Container,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type EmailLayoutProps = {
    preview: string;
    children: React.ReactNode;
};

export default function EmailLayout({
    preview,
    children,
}: EmailLayoutProps) {
    return (
        <Html>
            <Head />
            <Preview>{preview}</Preview>

            <Tailwind>
                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto my-8 max-w-md rounded-xl bg-white p-6">
                        {children}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
