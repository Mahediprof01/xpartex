"use client";
import Image from "next/image";
import Link from "next/link";
import CustomOrderCard from "@/components/custom-card/CustomOrderCard";

const customOrders = [
  {
    id: 1,
    image: "/custom.png",
    title: "Small Olive Wood shirt Buttons, Cl...",
    priceRange: "1.5-2",
    moq: "500 pice",
    sold: "50,580",
    reqSummited: "56",
  },
  {
    id: 2,
    image: "/custom2.png",
    title: "Large Coconut Shell Buttons",
    priceRange: "2.5-3",
    moq: "300 pice",
    sold: "12,000",
    reqSummited: "22",
  },
  {
    id: 3,
    image: "/custom3.png",
    title: "Premium Horn Shirt Button",
    priceRange: "4-5",
    moq: "100 pice",
    sold: "8,500",
    reqSummited: "10",
  },
  {
    id: 4,
    image: "/custom4.png",
    title: "Classic Plastic Button",
    priceRange: "0.5-1",
    moq: "1000 pice",
    sold: "100,000",
    reqSummited: "80",
  },
  {
    id: 5,
    image: "/custom5.png",
    title: "Metal Blazer Button",
    priceRange: "3-4",
    moq: "200 pice",
    sold: "5,000",
    reqSummited: "15",
  },
  {
    id: 6,
    image: "/custom6.png",
    title: "Wooden Toggle Button",
    priceRange: "2-2.5",
    moq: "400 pice",
    sold: "7,200",
    reqSummited: "18",
  },
];

export function Custom() {
  const tabs = ["All Custom", "Wood", "Metal", "Plastic", "Shell"];
  return (
    <>
      <div className="py-3 w-full">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold text-gray-700 mb-1">Custom Order</span>
            <hr className="w-full border-gray-200 mt-2" />
          </div>
        </div>
      </div>
      <section className="py-10">
        <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Select product</h2>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab}
                href="/custom-products"
                className="relative px-4 py-2 text-base font-medium focus:outline-none text-gray-800 bg-transparent border-none transition-colors duration-200 hover:text-sky-600"
                style={{ background: 'none', textDecoration: 'none' }}
              >
                <span className="relative inline-block">
                  {tab}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: Cards Section (reduced width) */}
          <div className="w-full lg:flex-[1_1_0%] xl:flex-[1.5_1_0%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {customOrders.map((item) => (
                <CustomOrderCard
                  key={item.id}
                  id={item.id.toString()}
                  image={item.image}
                  title={item.title}
                  priceRange={item.priceRange}
                  moq={item.moq}
                  sold={item.sold}
                  reqSummited={item.reqSummited}
                />
              ))}
            </div>
          </div>
          {/* Right: Requests Panel (aligned with filter tabs) */}
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl flex-[0_1_420px] bg-white rounded-xl shadow-md p-4 h-fit mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">Custom Requests</h3>
              <button className="flex items-center gap-1 text-gray-500 border px-2 py-1 rounded-md text-xs">
                <span>▼</span>
              </button>
            </div>
            <hr className="mb-2" />
            <ul className="flex flex-col gap-2">
              {[
                { name: 'Button World', desc: 'Wooden Button Orders', count: 12, logo: '/rentavatar.png' },
                { name: 'Metal Craft', desc: 'Metal Button Orders', count: 18, logo: '/rentavatar1.png' },
                { name: 'Plastic Hub', desc: 'Plastic Button Orders', count: 22, logo: '/rentavatar2.png' },
                { name: 'Shell Style', desc: 'Shell Button Orders', count: 9, logo: '/rentavatar3.png' },
                { name: 'Toggle Pro', desc: 'Toggle Button Orders', count: 15, logo: '/rentavatar4.png' },
                { name: 'Classic Buttons', desc: 'Classic Button Orders', count: 27, logo: '/rentavatar5.png' },
              ].map((req, idx) => (
                <li key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Image src={req.logo} alt={req.name} width={32} height={32} className="w-8 h-8 rounded-full object-contain bg-white border" />
                    <div>
                      <div className="font-bold text-gray-800 text-sm">{req.name}</div>
                      <div className="text-xs text-gray-500">{req.desc}</div>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold min-w-[36px] text-center">{req.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
