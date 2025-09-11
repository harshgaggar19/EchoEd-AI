import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { CheckCircleIcon } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <html lang="en">
          <head>
            <title>EchoEd AI</title>
          </head>
          <body>
            <Navbar />
            <Toaster
              position="bottom-right"
              theme="system"
              icons={{ success: <CheckCircleIcon /> }}
            />
            {children}
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
