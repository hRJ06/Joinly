import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/provider/Convex-Client-Provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/provider/Modal-Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joinly",
  description: "A collaborative realtime White Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
