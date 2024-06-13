import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
const inter = Inter({ subsets: ["latin"] });
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Tickety",
  description: "Your ticket generating app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Suspense fallback={<Loading />}>
          <Toaster />
          <MantineProvider>{children}</MantineProvider>
        </Suspense>
      </body>
    </html>
  );
}
