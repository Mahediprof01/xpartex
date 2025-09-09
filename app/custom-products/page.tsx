"use client"

import { useState } from 'react'
import ProductFilterSidebar from '@/components/product-filters/ProductFilterSidebar'
import CustomOrderCard from '@/components/custom-card/CustomOrderCard'


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

export default function CustomProductsPage() {
    const [filters, setFilters] = useState({
        availability: ["In Stock"],
        productType: ["Retail"],
        productCategory: ["Raw Materials"],
        brand: ["Norman Fabrics"],
        priceRange: [20, 500],
    });

    return (
        <div className="pt-16 lg:pt-20 min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div
                        className={`$
                            {showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}
                    >
                        <div className="sticky top-28">
                            <ProductFilterSidebar filters={filters} setFilters={setFilters} />
                        </div>
                    </div>

                    {/* Custom Orders Grid */}
                    <div className="flex-1">
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
                </div>
            </div>
        </div>
    );
}
