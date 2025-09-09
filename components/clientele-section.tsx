"use client"




import SupplierCard from './supplier-card/SupplierCard';

const suppliers = [
  {
    id: 1,
    name: 'Noman Zipper Ltd.',
    logo: '/supplieravatar.png',
    location: 'Dhaka, Bangladesh',
    rating: 4.8,
    reviews: 300,
    status: 'Active',
  },
  {
    id: 2,
    name: 'SkyPack Accessories',
    logo: '/supplieravatar2.png',
    location: 'Delhi, India',
    rating: 4.9,
    reviews: 200,
    status: 'Active',
  },
  {
    id: 3,
    name: 'TrendTag Branding',
    logo: '/supplieravatar3.png',
    location: 'Jakarta, Indonesia',
    rating: 4.7,
    reviews: 250,
    status: 'Active',
  },
  {
    id: 4,
    name: 'VelcroTech Supplies',
    logo: '/supplieravatar4.png',
    location: 'Vinh City, Vietnam',
    rating: 4.9,
    reviews: 350,
    status: 'Active',
  },
];

export function ClienteleSection() {
  return (
    <section className="py-10 bg-[#f7fbfd]">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Top Supplier</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {suppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              id={supplier.id}
              name={supplier.name}
              logo={supplier.logo}
              location={supplier.location}
              rating={supplier.rating}
              reviews={supplier.reviews}
              // You can add more props if needed
            />
          ))}
        </div>
      </div>
    </section>
  )
}
