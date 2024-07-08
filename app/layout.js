import { Inter } from "next/font/google";
import Script from "next/script";
import { BG } from "../components/mainBG";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Epithet OC Generator",
  description:
    "Generate or Create Original Characters (OC) for Epithet Erased: Anime Campaign",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P7BRKLLT');`,
          }}
        ></Script>
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen m-w-screen">
          <BG />
          {children}
        </div>
      </body>
    </html>
  );
}
