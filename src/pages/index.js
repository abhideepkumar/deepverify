import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Content from "@/components/content";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <main className={` ${inter.className}`}>
    <Navbar />
    <Content/>
  </main>;
}