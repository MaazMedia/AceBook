import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./UserContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AceBook",
  description: "AceBook The Media You desire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
