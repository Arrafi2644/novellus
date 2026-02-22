
import Image from 'next/image';
import heroBg from "../../../public/assets/Gemini_Generated_Image_ysj4t3ysj4t3ysj4.webp" 
import { HeroServer } from './HeroServer';

export default function Hero() {

  return (
  <div className="w-full relative py-12 ">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Professional Accounting Office"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />

      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-0 pb-2 overflow-hidden">
        <HeroServer />
      </div>
    </div>
  );
}