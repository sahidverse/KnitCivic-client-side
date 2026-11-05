import type { Metadata } from "next";
import { Space_Grotesk, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";
import Loader from "@/components/loader/Loader";
import { FooterSecondary } from "@/components/layout/footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KnitCivic — Together We Can",
  description:
    "Join our community of kind people and take part in meaningful events that help build a better, stronger and more compassionate society.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${caveat.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("knit-civic-theme");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Loader>
          <Navbar />
          <main className="flex-1">{children}</main>
          {/* <Toaster /> */}
          <Toaster position="top-right" richColors />
          <FooterSecondary />
        </Loader>
      </body>
    </html>
  );
}
