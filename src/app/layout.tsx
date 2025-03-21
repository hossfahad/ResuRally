import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview Rally - Interactive Interview Practice",
  description: "Practice for job interviews with AI-powered questions presented by a virtual interviewer.",
  keywords: ["interview", "questions", "job", "preparation", "ai", "openai", "practice", "virtual interviewer"],
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
        style={{
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)'
        }}
      >
        {children}
        <Toaster toastOptions={{
          style: {
            background: '#FDBA74',
            color: '#7C2D12',
            border: '1px solid #FB923C'
          },
          classNames: {
            toast: 'group',
            title: 'text-orange-900 font-medium',
            description: 'text-orange-800',
          }
        }} />
      </body>
    </html>
  );
}
