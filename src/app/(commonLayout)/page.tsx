
import Hero from "@/components/modules/Hero";
import MainSection from "@/components/modules/MainSection";
import WelcomeMenuModal from "@/components/modules/WelcomeModal";

export default async function Home() {

  return (
    <div className="">
      <Hero />
      <MainSection />
      <WelcomeMenuModal />
    </div>
  );
}
