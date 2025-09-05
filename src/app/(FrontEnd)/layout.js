import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/FrontEnd/Header/Header";
import Footer from "@/components/FrontEnd/Footer/Footer";
import Providers from "@/redux-toolkit/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Task",
  description: "task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className="w-full h-full relative font-Poppins font-normal overflow-x-hidden home-3"
      >
        <Providers>
          <Header />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
          />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
