import Image from "next/image";

export default function BannerRow() {
  return (
    <section className="py-8">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1 rounded-xl overflow-hidden">
            <Image
              src="/land1.png"
              alt="Banner 1"
              width={600}
              height={120}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div className="flex-1 rounded-xl overflow-hidden">
            <Image
              src="/land2.png"
              alt="Banner 2"
              width={600}
              height={120}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
