import { getUserInfo } from "@/auth/auth";
import CategoryNavbar from "@/components/modules/CategoryNavbar";
import CategoryWiseFoodSection from "@/components/modules/CategoryWiseFoodSection";
import Hero from "@/components/modules/Hero";
import MainSection from "@/components/modules/MainSection";
import Footer from "@/components/shared/Footer";
import { serverFetch } from "@/utils/server-fetch";
import Image from "next/image";

export default async function Home() {
  const res = await serverFetch.get("/user/me");
  const data = await res.json();

  return (
    <div className="">
      <Hero />
      {/* <CategoryNavbar /> */}
      <MainSection />
      <Footer />
    </div>
  );
}
