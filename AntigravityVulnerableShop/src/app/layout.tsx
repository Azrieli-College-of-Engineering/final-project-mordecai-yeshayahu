import type { Metadata } from "next";
import "./globals.css";
import { seedDatabase } from "@/lib/seed";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Aura | Premium Clothing",
  description: "Aura - The Next Generation of Premium E-Commerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Execute db seed on server layout load
  await seedDatabase();

  return (
    <html lang="en">
      <body>
        <div className="app-wrapper flex-col min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
