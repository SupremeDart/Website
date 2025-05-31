import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from '@/components/auth/AuthProvider';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Supreme Dart",
  description: "Easily pay all your bills in one place, from electricity and internet to airtime and TV subscriptions. Fast, secure, and hassle-free bill payments made simple.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}