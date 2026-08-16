import { Jost } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";

const jost = Jost({
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault: Startup Idea Sharing Platform",
  description: "Startup Idea Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jost.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-base-100 text-base-content">
        <ThemeProvider>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2500,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}