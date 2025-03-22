import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MantineProvider, createTheme, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define a custom theme with orange as the primary color
const theme = createTheme({
  primaryColor: 'orange',
  colors: {
    orange: [
      '#FFF7ED', // 0
      '#FFEDD5', // 1
      '#FED7AA', // 2
      '#FDBA74', // 3
      '#FB923C', // 4
      '#F97316', // 5
      '#EA580C', // 6
      '#C2410C', // 7
      '#9A3412', // 8
      '#7C2D12', // 9
    ],
  },
  fontFamily: "'Geist', sans-serif",
  headings: {
    fontFamily: "'Geist', sans-serif",
  }
});

export const metadata: Metadata = {
  title: "Interview Rally - Interactive Interview Practice",
  description: "Practice for job interviews with AI-powered questions presented by a virtual interviewer. Prepare confidently with personalized questions based on any job description.",
  keywords: ["interview preparation", "job questions", "interview practice", "career preparation", "ai interviewer", "voice interview", "interview skills"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications position="top-center" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
