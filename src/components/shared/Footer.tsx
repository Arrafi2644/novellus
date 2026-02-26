import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-16 py-6">
        <div className="container mx-auto text-center space-y-4 py-7 px-4 md:px-6 lg:px-8">

      <p className="text-center text-sm text-gray-500">
        © 2026 Pizzerianovellus | All rights reserved | Developed By <a className="hover:underline hover:text-[#EF4823]" href="https://dotskillsbd.com" target="_blank">DotSkills</a>
      </p>
 
      <ul className="flex items-center gap-4 justify-center text-sm">
        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
        <li><Link href="/terms-condition">Terms & Condition</Link></li>
      </ul>
        </div>
    </footer>
  );
}
