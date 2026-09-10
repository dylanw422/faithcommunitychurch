import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Analytics } from "@vercel/analytics/next";
// import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faith Community Church",
  description: "Join Faith Community Church in Moss Bluff on Sundays at 10:00 AM.",
  openGraph: {
    title: "Faith Community Church",
    description: "Join us every Sunday at 10:00 AM",
    images: [
      {
        url: "https://fcclc.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Faith Community Church in Moss Bluff, Louisiana",
      },
    ],
    locale: "en_US",
    siteName: "Faith Community Church",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faith Community Church",
    description: "Join us every Sunday at 10:00 AM",
    images: ["https://fcclc.com/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider style={{ "--sidebar-width": "22rem" } as React.CSSProperties}>
          <main className="bg-background flex min-w-0 flex-1 flex-col items-center">
            <Nav />
            <div className="w-full md:w-3/4">{children}</div>
            <Footer />
          </main>
          <AppSidebar />
        </SidebarProvider>
        <Analytics />
      </body>
    </html>
  );
}
