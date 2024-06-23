import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Dancing_Script, Poppins } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../providers/AuthProvider";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancingscript",
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: "600",
});

const poppinsLight = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins-light",
  weight: "400",
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sewing Blog",
  description: "Personal blog about sewing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${poppins.variable} ${poppinsLight.variable} ${dancingScript.variable}`}
      >
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
