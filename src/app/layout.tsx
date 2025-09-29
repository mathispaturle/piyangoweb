import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Piyango - Sube el nivel de tus sorteos",
  description: "Piyango es la nueva forma de participar en sorteos únicos organizados por marcas y tiendas seleccionadas. Intuitivo, transparente y divertido.",
  keywords: ["Piyango", "sorteos", "rifas", "premios", "marketplace", "experiencias", "tiendas", "startup española"],
  authors: [{ name: "RIFFY SOLUTIONS S.L.", url: "https://www.piyango.es" }],
  openGraph: {
    title: "Piyango - La nueva generación de sorteos",
    description: "Participa en rifas exclusivas organizadas por marcas y tiendas. Una experiencia innovadora, segura y transparente.",
    url: "https://www.piyango.es",
    siteName: "Piyango",
    images: [
      {
        url: "https://www.piyango.es/og-image.jpg", // asegúrate de tener una imagen válida
        width: 1200,
        height: 630,
        alt: "Piyango - Sorteos únicos con tu tienda favorita",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyango",
    description: "Participa en sorteos increíbles de forma fácil, segura y divertida.",
    images: ["https://www.piyango.es/twitter-card.jpg"], // también válida para redes
    creator: "@piyango_es", // si tienes cuenta
  },
  metadataBase: new URL("https://www.piyango.es"),
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${onest.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
