import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://hamidali.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personalInfo.name} | Frontend Developer & AI Student`,
    template: `%s | ${personalInfo.name}`,
  },
  description:
    "Portfolio of Hamid Ali — Frontend Developer, BS Artificial Intelligence student, and Graphic Designer based in Karachi, Pakistan. Building modern web experiences with AI, design, and development.",
  keywords: [
    "Hamid Ali",
    "Frontend Developer",
    "Portfolio",
    "Next.js",
    "React",
    "Artificial Intelligence",
    "Graphic Designer",
    "Karachi",
    "Pakistan",
    "Web Developer",
  ],
  authors: [{ name: personalInfo.name, url: siteUrl }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${personalInfo.name} Portfolio`,
    title: `${personalInfo.name} | Frontend Developer & AI Student`,
    description:
      "Building modern web experiences with AI, design, and development. Frontend Developer, BS AI Student, and Graphic Designer.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | Frontend Developer`,
    description:
      "Building modern web experiences with AI, design, and development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: "Frontend Developer",
  description: personalInfo.title,
  email: personalInfo.email,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.behance],
  knowsAbout: [
    "Frontend Development",
    "React",
    "Next.js",
    "Artificial Intelligence",
    "Graphic Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-text antialiased">
        {children}
      </body>
    </html>
  );
}
