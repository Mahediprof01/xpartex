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
const PROFILE_TYPES = [
  "Individual Professional",
  "Company",
  "Service Provider",
  "Freelancer",
];
const INDUSTRIES = [
  "Logistics & Transport",
  "Equipment Rental",
  "Warehousing & Storage",
  "Construction",
  "Supply Chain",
  "Retail Distribution",
];
const RATINGS = ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"];
const VERIFICATIONS = ["Verified Only", "All"];

export interface ProfessionalFilterState {
  location: string[];
  profileType: string[];
  industry: string[];
  rating: string[];
  verification: string[];
}

interface ProfessionalFilterSidebarProps {
  filters: ProfessionalFilterState;
  onChange: (filters: ProfessionalFilterState) => void;
}

export default function ProfessionalFilterSidebar({ filters, onChange }: ProfessionalFilterSidebarProps) {
  // Helper to toggle a value in an array
  const toggle = (key: keyof ProfessionalFilterState, value: string) => {
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
      {/* Profile Type */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Profile Type</h3>
        <div className="space-y-2">
          {PROFILE_TYPES.map(type => (
            <label key={type} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{type}</span>
              <input
                type="checkbox"
                checked={filters.profileType.includes(type)}
                onChange={() => toggle("profileType", type)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.profileType.includes(type) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.profileType.includes(type) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.profileType.includes(type)
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
      {/* Industry / Category */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Industry / Category</h3>
        <div className="space-y-2">
          {INDUSTRIES.map(ind => (
            <label key={ind} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{ind}</span>
              <input
                type="checkbox"
                checked={filters.industry.includes(ind)}
                onChange={() => toggle("industry", ind)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.industry.includes(ind) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.industry.includes(ind) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.industry.includes(ind)
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
      {/* Verification */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Verification</h3>
        <div className="space-y-2">
          {VERIFICATIONS.map(ver => (
            <label key={ver} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{ver}</span>
              <input
                type="checkbox"
                checked={filters.verification.includes(ver)}
                onChange={() => toggle("verification", ver)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.verification.includes(ver) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.verification.includes(ver) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.verification.includes(ver)
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
