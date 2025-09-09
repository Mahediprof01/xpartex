import React from "react";

const AVAILABILITY = ["In Stock", "Out of Stock"];
const PRODUCT_TYPES = ["Retail", "Customize Order"];
const PRODUCT_CATEGORIES = [
  "Raw Materials", "Fabrics", "Lining Fabric", "Interlining", "Wadding", "Elastic", "Rib", "Trims", "Labels", "Packaging", "Decorative"
];
const BRANDS = [
  "Norman Fabrics", "Ha-Meem Textile", "Square Textiles", "Ananta Dyeing", "Zaber & Zubair", "IDEAL", "Avery Dennison", "Global Button House", "Others"
];

export interface ProductFilterSidebarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilters: (filters: any) => void;
}

export default function ProductFilterSidebar({ filters, setFilters }: ProductFilterSidebarProps) {
  const toggle = (key: string, value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilters((prev: any) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v: string) => v !== value)
          : [...arr, value],
      };
    });
  };
  const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilters((prev: any) => ({ ...prev, priceRange: [Number(e.target.value), prev.priceRange[1]] }));
  };
  const handleRangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilters((prev: any) => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }));
  };
  return (
    <aside className="w-full max-w-xs">
      <h2 className="text-2xl font-bold mb-6 text-black">Filter</h2>
      {/* Availability */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Availability</h3>
        <div className="space-y-2">
          {AVAILABILITY.map((item) => (
            <label key={item} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{item}</span>
              <input
                type="checkbox"
                checked={filters.availability?.includes(item) || false}
                onChange={() => toggle("availability", item)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.availability?.includes(item) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.availability?.includes(item) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.availability?.includes(item)
                    ? {
                        backgroundImage:
                          "url('data:image/svg+xml;utf8,<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 8.5L7 11.5L12 5.5\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: '70% 70%',
                      }
                    : {}),
                }}
              />
            </label>
          ))}
        </div>
      </div>
      {/* Product Type */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Product Type</h3>
        <div className="space-y-2">
          {PRODUCT_TYPES.map((type) => (
            <label key={type} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{type}</span>
              <input
                type="checkbox"
                checked={filters.productType?.includes(type) || false}
                onChange={() => toggle("productType", type)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.productType?.includes(type) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.productType?.includes(type) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.productType?.includes(type)
                    ? {
                        backgroundImage:
                          "url('data:image/svg+xml;utf8,<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 8.5L7 11.5L12 5.5\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: '70% 70%',
                      }
                    : {}),
                }}
              />
            </label>
          ))}
        </div>
      </div>
      {/* Product Category */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Product Category</h3>
        <div className="space-y-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{cat}</span>
              <input
                type="checkbox"
                checked={filters.productCategory?.includes(cat) || false}
                onChange={() => toggle("productCategory", cat)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.productCategory?.includes(cat) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.productCategory?.includes(cat) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.productCategory?.includes(cat)
                    ? {
                        backgroundImage:
                          "url('data:image/svg+xml;utf8,<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 8.5L7 11.5L12 5.5\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: '70% 70%',
                      }
                    : {}),
                }}
              />
            </label>
          ))}
        </div>
      </div>
      {/* Brand */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Brand</h3>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{brand}</span>
              <input
                type="checkbox"
                checked={filters.brand?.includes(brand) || false}
                onChange={() => toggle("brand", brand)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.brand?.includes(brand) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.brand?.includes(brand) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.brand?.includes(brand)
                    ? {
                        backgroundImage:
                          "url('data:image/svg+xml;utf8,<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 8.5L7 11.5L12 5.5\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: '70% 70%',
                      }
                    : {}),
                }}
              />
            </label>
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Price Range</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">${filters.priceRange?.[0] || 20}.00</span>
          <input
            type="range"
            min={20}
            max={500}
            value={filters.priceRange?.[0] || 20}
            onChange={handleRange}
            className="w-full accent-sky-400"
          />
          <input
            type="range"
            min={20}
            max={500}
            value={filters.priceRange?.[1] || 500}
            onChange={handleRangeMax}
            className="w-full accent-sky-400"
          />
          <span className="text-xs text-gray-500">${filters.priceRange?.[1] || 500}.00</span>
        </div>
      </div>
    </aside>
  );
}
