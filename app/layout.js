import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Wrapper } from "@/components/wrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brainy Meeting Assistant",
  description: "Transcribe your meetings in real-time and get insights about them.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
