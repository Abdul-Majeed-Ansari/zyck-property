import Head from "next/head"; // Import Head from Next.js
import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import Footer from "@/components/views/Footer";
import Navbar from "@/components/views/Navbar";
import SignInPanel from "@/components/ui/SignInPanel";
import { ToastContainer } from "react-toastify";
import { Providers } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Zyck Property – Your Trusted Real Estate Partner",
  description:
    "Explore properties for sale, rent, and real estate services with Zyck Property. Simplifying real estate across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="fUUT_q5k9eBGJXvznM_iFkUgauXOgnL9jhrY5iwkWUs"
        />
        {/* Google Analytics Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L565MF8SKB"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L565MF8SKB');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lato.variable} antialiased`}
      >
        <Providers>
          <Navbar>
            <SignInPanel />
          </Navbar>
          {children}
          <ToastContainer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
