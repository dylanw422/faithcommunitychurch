import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
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
  description: "Sundays at 5:00 PM",
  openGraph: {
    title: "Faith Community Church",
    description: "Join us every Sunday at 5:00 PM",
    images: [
      {
        url: "https://fcclc.com/fcc2.webp",
        height: 500,
        width: 500,
      },
    ],
    locale: "en_US",
    siteName: "Faith Community Church",
    type: "website",
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
        <SidebarProvider>
          <AppSidebar />
          <main className={`bg-background flex flex-col items-center w-full`}>
            <Nav />
            <div className="w-full md:w-3/4">{children}</div>
            <Footer />
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
