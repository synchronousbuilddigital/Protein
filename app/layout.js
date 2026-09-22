import { Fira_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";

const firaSans = Fira_Sans({
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-fira-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "The Proteinest — Fueling the finest you",
  description:
    "Premium plant-based protein built on clean, potent, responsibly sourced ingredients. Science-backed. Precision formulated. Made for the finest version of you.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${firaSans.variable} ${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
