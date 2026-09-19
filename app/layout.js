import { Anton, Inter, Caveat } from "next/font/google";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata = {
  title: "The Proteinest — Fueling the finest you",
  description: "Clean, gentle, great-tasting protein formulated for the Indian body. NABL lab tested, no-bloat promise.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
