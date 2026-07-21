import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import {
  Fraunces,
  Courier_Prime,
  Cedarville_Cursive,
  Outfit,
} from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://paperplanes.ink"),

  title: {
    default: "PaperPlanes",
    template: "%s | PaperPlanes",
  },

  description:
    "Write heartfelt letters to the people you love. Keep them private or share them with the world. PaperPlanes is a home for words that matter.",

  applicationName: "PaperPlanes",

  keywords: [
    "digital love letters",
    "online letters",
    "letters",
    "love letters",
    "private letters",
    "public letters",
    "letter writing",
    "write a letter online",
    "long distance relationship",
    "pen pals",
    "writing",
    "PaperPlanes",
  ],

  authors: [
    {
      name: "PaperPlanes",
    },
  ],

  category: "Writing",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    title: "PaperPlanes",
    description:
      "Write heartfelt letters to the people you love. Keep them private or share them with the world. PaperPlanes is a home for words that matter.",
    url: "https://paperplanes.ink",
    siteName: "PaperPlanes",
    locale: "en_US",
    type: "website",

    
     images: [
       {
      url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "PaperPlanes",
      },
     ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PaperPlanes",
    description:
      "Write heartfelt letters to the people you love. Keep them private or share them with the world.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const fraunces = Fraunces({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-ui",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-letter",
});

const cedarvilleCursive = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${courierPrime.variable} ${outfit.variable} ${cedarvilleCursive.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
        <GoogleAnalytics
  gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!}
/>
      </body>
    </html>
  );
}