import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer
      className="w-full bg-[#0095C7] text-white pt-12 pb-4 px-2 md:px-0 relative overflow-hidden border border-[#1ca7e9]"
      style={{ fontFamily: 'inherit' }}
    >
  <div className="container mx-auto px-2 sm:px-4 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10 relative z-10">
        {/* Left: Logo & Contact */}
        <div className="flex-1 min-w-[180px] sm:min-w-[220px] flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/Xpartex-03 1.png" alt="Xpartex Logo" width={140} height={36} className="h-8 sm:h-10 w-auto" />
          </div>
          <div className="font-semibold mb-1 text-base">Contact Us</div>
          <div className="flex items-start gap-3 text-sm mb-1">
            <Image src="/wp.png" alt="WhatsApp" width={24} height={24} className="mt-1 w-6 h-6" />
            <div className="flex flex-col">
              <span className="font-medium text-xs sm:text-sm">Whats App</span>
              <span className="text-white/90 text-xs sm:text-sm">+1 202-918-2132</span>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm mb-1">
            <Image src="/Call.png" alt="Call" width={24} height={24} className="mt-1 w-6 h-6" />
            <div className="flex flex-col">
              <span className="font-medium text-xs sm:text-sm">Call Us</span>
              <span className="text-white/90 text-xs sm:text-sm">+1 202-918-2132</span>
            </div>
          </div>
          <div className="font-semibold mt-2 mb-1 text-base">Download App</div>
          <div className="flex gap-2 flex-wrap">
            <Link href="#" aria-label="App Store" className="cursor-pointer">
              <Image src="/appstore.png" alt="App Store" width={130} height={40} className="h-8 sm:h-10 w-auto" />
            </Link>
            <Link href="#" aria-label="Google Play" className="cursor-pointer">
              <Image src="/playstore.png" alt="Google Play" width={130} height={40} className="h-8 sm:h-10 w-auto" />
            </Link>
          </div>
        </div>

        {/* Center: Most Popular Categories */}
  <div className="flex-1 min-w-[180px] sm:min-w-[220px] flex flex-col gap-2">
          <div className="font-semibold mb-2 border-b border-white/40 w-fit pb-1 text-base">Most Popular Categories</div>
          <ul className="text-sm flex flex-col gap-6 pl-4 list-disc text-white/90">
            <li className="cursor-pointer"><Link href="#">Raw Materials</Link></li>
            <li className="cursor-pointer"><Link href="#">Garment Accessories</Link></li>
            <li className="cursor-pointer"><Link href="#">Labeling and Branding</Link></li>
            <li className="cursor-pointer"><Link href="#">Packaging Accessories</Link></li>
            <li className="cursor-pointer"><Link href="#">Decorative Accessories</Link></li>
          </ul>
        </div>

        {/* Right: Customer Services */}
  <div className="flex-1 min-w-[180px] sm:min-w-[220px] flex flex-col gap-2">
          <div className="font-semibold mb-2 border-b border-white/40 w-fit pb-1 text-base">Customer Services</div>
          <ul className="text-sm flex flex-col gap-6 pl-4 list-disc text-white/90">
            <li className="cursor-pointer"><Link href="#">About Us</Link></li>
            <li className="cursor-pointer"><Link href="#">Terms & Conditions</Link></li>
            <li className="cursor-pointer"><Link href="#">FAQ</Link></li>
            <li className="cursor-pointer"><Link href="#">Privacy Policy</Link></li>
            <li className="cursor-pointer"><Link href="#">E-Waste Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Decorative circle top right */}
  <div className="hidden md:block absolute right-0 top-0 h-[160px] w-[160px] md:h-[220px] md:w-[220px] rounded-full bg-cyan-300/30 translate-x-1/3 -translate-y-1/3 z-0 border-2 border-cyan-200" />

      {/* Copyright */}
      <div className="w-full border-t border-white/20 mt-8 md:mt-10 pt-3 text-center text-xs sm:text-sm opacity-90 relative z-10">
        © 2025 All rights reserved. Xpartex.
      </div>
    </footer>
  );
}

export default Footer;
