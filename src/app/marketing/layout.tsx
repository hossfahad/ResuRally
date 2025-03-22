import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import { MantineProvider, createTheme, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
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
  fontFamily: "'Inter', Calibri, sans-serif",
  headings: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    Text: {
      defaultProps: {
        ff: "Calibri, sans-serif",
      },
    },
    Button: {
      defaultProps: {
        ff: "'Inter', sans-serif",
      },
    },
    Title: {
      defaultProps: {
        ff: "'Inter', sans-serif",
      },
    },
    Paper: {
      defaultProps: {
        style: { fontFamily: 'Calibri, sans-serif' },
      },
    },
  },
});

export const metadata: Metadata = {
  title: "Interview Rally - AI-Powered Interview Preparation",
  description: "Practice for job interviews with AI-powered questions presented by a virtual interviewer. Prepare confidently with personalized questions based on any job description.",
  keywords: ["interview preparation", "job questions", "interview practice", "career preparation", "ai interviewer", "voice interview", "interview skills"],
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link 
          href="https://fonts.cdnfonts.com/css/calibri-2" 
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications position="top-center" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
} 