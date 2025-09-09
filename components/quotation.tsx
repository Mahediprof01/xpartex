import Image from 'next/image';

const quotations = [
  {
    title: '320 GSM Fleece Hoodie',
    image: '/quotation1.jpg',
  },
  {
    title: 'Perkinsheven 180 GSM 100% Cotton',
    image: '/quotation2.jpg',
  },
  {
    title: 'Cutfabs 25 Options 100%',
    image: '/quotation3.jpg',
  },
  {
    title: 'Heavyweight Polo Shirt',
    image: '/quotation4.jpg',
  },
  {
    title: 'Bates 2" x 4" Heavy Duty Hook',
    image: '/quotation5.jpg',
  },
];

export function Quotation() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Quotation Products</h2>
          <button className="bg-sky-400 hover:bg-sky-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all">View All Quotation</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {quotations.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center w-full min-w-[220px] max-w-[260px] p-6">
              <div className="w-full h-44 flex items-center justify-center mb-3">
                <Image src={item.image} alt={item.title} width={180} height={180} className="object-contain max-h-44" />
              </div>
              <div className="font-medium text-base text-center mb-3 truncate w-full" title={item.title}>{item.title}</div>
              <button className="w-full border border-gray-300 bg-white text-gray-900 font-semibold py-2 rounded-full text-sm transition-all hover:bg-gray-50">Request Custom Order</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
