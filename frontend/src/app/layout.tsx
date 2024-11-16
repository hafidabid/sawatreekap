import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const OnchainProviders = dynamic(
  () => import("../providers/coinbaseDevProvider"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
    title: "Sawatreekap",
    description: "Plant for better future",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <OnchainProviders>
            {children}
        </OnchainProviders>
        </body>
        </html>
    );
}
