import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const forwardedHost = incomingHeaders.get("x-forwarded-host");
  const host = forwardedHost ?? incomingHeaders.get("host") ?? "localhost:3000";
  const protocol =
    incomingHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Easy Job — Inscreva-se no beta fechado",
    description:
      "Entre na lista de espera da Easy Job e seja uma das primeiras pessoas a testar uma forma mais simples de criar seu currículo, encontrar oportunidades e organizar sua busca de emprego.",
    icons: {
      icon: [{ url: "/favicon-fox.png", type: "image/png", sizes: "512x512" }],
      shortcut: "/favicon-fox.png",
      apple: [{ url: "/favicon-fox.png", sizes: "512x512", type: "image/png" }],
    },
    openGraph: {
      title: "Easy Job — Inscreva-se no beta fechado",
      description:
        "Entre na lista de espera e seja uma das primeiras pessoas a testar a Easy Job: currículo, oportunidades e sua busca de emprego organizados pelo celular.",
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Easy Job — Inscreva-se no beta fechado.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Easy Job — Inscreva-se no beta fechado",
      description:
        "Entre na lista de espera e seja uma das primeiras pessoas a testar a Easy Job: currículo, oportunidades e sua busca de emprego organizados pelo celular.",
      images: ["/og.png"],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4efe4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
