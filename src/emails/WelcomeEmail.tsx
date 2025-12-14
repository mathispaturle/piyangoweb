import { Text, Heading } from "@react-email/components";
import EmailLayout from "./components/EmailLayout";

export default function WelcomeEmail({
    name,
}: {
    name?: string;
}) {
    return (
        <EmailLayout preview="Bienvenido a Piyango 🎉">
            <Heading className="text-xl font-bold text-gray-900">
                ¡Bienvenido{name ? `, ${name}` : ""}!
            </Heading>

            <Text className="mt-4 text-gray-700">
                Ya formas parte de Piyango, la plataforma donde participar en rifas es
                fácil, transparente y seguro.
            </Text>

            <Text className="mt-4 text-gray-700">
                🎟️ Explora rifas activas
                🧾 Gestiona tus boletos
                🏆 Sigue los sorteos en tiempo real
            </Text>

            <Text className="mt-6 text-sm text-gray-500">
                Buena suerte 🍀
                El equipo de Piyango
            </Text>
        </EmailLayout>
    );
}
