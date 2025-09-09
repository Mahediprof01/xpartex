import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ExpertProfileCard() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 bg-[#2C353C] rounded-2xl p-8 flex flex-col justify-between min-h-[340px]">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Sarah Khan</h2>
              <div className="flex items-center mb-2">
                <span className="text-lg text-gray-200 mr-2">Textile Designer</span>
                <span className="bg-[#00B6FF] text-white text-xs px-3 py-1 rounded-full">Connect</span>
              </div>
              <p className="text-gray-200 mb-4 text-sm">
                Join a powerful community of textile and apparel professionals dedicated to shaping the future of the industry. Connect with like-minded experts, share insights, collaborate on innovative projects, and discover new trends. Whether you&apos;re a designer, manufacturer, supplier, or entrepreneur, this is your platform to grow, network, and unlock exciting business opportunities worldwide.<br />
                Ask ChatGPT
              </p>
            </div>
            <Button className="mt-4 w-fit bg-transparent border border-white text-white hover:bg-white hover:text-[#2C353C] rounded-full px-6 py-2">Join The Network</Button>
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden min-h-[340px] flex">
            <Image
              src="/cloth1.jpg"
              alt="Sarah Khan profile"
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
