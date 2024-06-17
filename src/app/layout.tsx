"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "bitcoin-wallet-adapter";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletProvider customAuthOptions={{network:"testnet"}}>
     <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </WalletProvider>
  );
}