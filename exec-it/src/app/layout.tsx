"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00bcd4", // Cool cyan color
    },
    background: {
      default: "#121212", // Deep black background
      paper: "#1e1e1e", // Dark grey panels
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#b0bec5", // Light grey text
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // Modern typography
  },
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Exec_It",
//   description: "Your Favourite Code execution platform",
// };

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
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Ensures consistent MUI styles */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
