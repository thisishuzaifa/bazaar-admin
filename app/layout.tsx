import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ModalProvider } from "@/providers/modal-providers";
import { Toaster } from "@/components/ui/sonner"

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

export const metadata: Metadata = {
  title: "Bazaar Admin",
  description: "Univeral marketplace admin portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
       <ModalProvider />   
      {children}
      <Toaster />
    </body>
    </html>
    </ClerkProvider>
  );
}
