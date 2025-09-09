import React from "react";

const LOCATIONS = [
  "Bangladesh",
  "China",
  "USA",
  "India",
  "Canada",
  "Europe",
  "Malaysia",
  "Other",
];
const PRODUCT_CATEGORIES = [
  "Fashion & Design Experts",
  "Pattern Designer",
  "Fashion Designer",
  "Textile Designer",
  "Production & Technical Experts",
  "Quality & Compliance Experts",
  "Business & Operations Experts",
  "Marketing & Sales Experts",
];
const CERTIFICATIONS = ["OEKO-TEX", "GOTS", "ISO", "ETC"];
const RATINGS = ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"];
const VERIFIED = ["Verified Suppliers Only"];

export interface FreelancerFilterState {
  location: string[];
  productCategory: string[];
  certification: string[];
  rating: string[];
  verified: string[];
}

interface FreelancerFilterSidebarProps {
  filters: FreelancerFilterState;
  onChange: (filters: FreelancerFilterState) => void;
}

export default function FreelancerFilterSidebar({ filters, onChange }: FreelancerFilterSidebarProps) {
  const toggle = (key: keyof FreelancerFilterState, value: string) => {
    const arr = filters[key];
    const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
    onChange({ ...filters, [key]: next });
  };

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-2xl font-bold mb-6 text-black">Filter</h2>
      {/* Location */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Location</h3>
        <div className="space-y-2">
          {LOCATIONS.map(loc => (
            <label key={loc} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{loc}</span>
              <input
                type="checkbox"
                checked={filters.location.includes(loc)}
                onChange={() => toggle("location", loc)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.location.includes(loc) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.location.includes(loc) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.location.includes(loc)
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
          {PRODUCT_CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{cat}</span>
              <input
                type="checkbox"
                checked={filters.productCategory.includes(cat)}
                onChange={() => toggle("productCategory", cat)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.productCategory.includes(cat) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.productCategory.includes(cat) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.productCategory.includes(cat)
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
      {/* Certification */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Certification</h3>
        <div className="space-y-2">
          {CERTIFICATIONS.map(cert => (
            <label key={cert} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{cert}</span>
              <input
                type="checkbox"
                checked={filters.certification.includes(cert)}
                onChange={() => toggle("certification", cert)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.certification.includes(cert) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.certification.includes(cert) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.certification.includes(cert)
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
      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Rating</h3>
        <div className="space-y-2">
          {RATINGS.map(rating => (
            <label key={rating} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{rating}</span>
              <input
                type="checkbox"
                checked={filters.rating.includes(rating)}
                onChange={() => toggle("rating", rating)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.rating.includes(rating) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.rating.includes(rating) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.rating.includes(rating)
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
      {/* Verified */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Verified</h3>
        <div className="space-y-2">
          {VERIFIED.map(ver => (
            <label key={ver} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{ver}</span>
              <input
                type="checkbox"
                checked={filters.verified.includes(ver)}
                onChange={() => toggle("verified", ver)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.verified.includes(ver) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.verified.includes(ver) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.verified.includes(ver)
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
    </div>
  );
}
