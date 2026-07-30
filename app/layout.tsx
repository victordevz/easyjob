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
    title: "Easy Job — Sua busca de emprego pronta",
    description:
      "Crie seu currículo, encontre empresas e prepare seus contatos em uma busca de emprego guiada pelo celular.",
    icons: {
      icon: [{ url: "/favicon-fox.png", type: "image/png", sizes: "512x512" }],
      shortcut: "/favicon-fox.png",
      apple: [{ url: "/favicon-fox.png", sizes: "512x512", type: "image/png" }],
    },
    openGraph: {
      title: "Easy Job — Sua busca de emprego pronta",
      description:
        "Entre sem nada. Saia com sua busca de emprego pronta.",
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Easy Job — Entre sem nada. Saia com sua busca de emprego pronta.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Easy Job — Sua busca de emprego pronta",
      description:
        "Entre sem nada. Saia com sua busca de emprego pronta.",
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
