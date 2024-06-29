import { Inter } from "next/font/google";
import { BG } from "../components/mainBG";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Epithet Generator",
  description: "Generate characters for Epithet Erased: Anime Campaign",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen m-w-screen">
          <BG />
          {children}
        </div>
      </body>
    </html>
  );
}
