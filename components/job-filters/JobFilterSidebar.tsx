import React from "react";

const LOCATIONS = [
  "Bangladesh", "China", "USA", "India", "Canada", "Europe", "Malaysia", "Other"
];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const JOB_CATEGORIES = [
  "Merchandising", "Production", "Quality Assurance", "Logistics & Supply Chain", "Design & Development", "HR & Compliance"
];
const EXPERIENCE_LEVELS = [
  "Entry Level (0-2 years)", "Mid Level (2-5 years)", "Senior Level (5+ years)"
];
const POSTING_DATES = [
  "Last 24 Hours", "Last 7 Days", "Last 30 Days"
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function JobFilterSidebar({ filters, setFilters }: { filters: any; setFilters: (filters: any) => void }) {
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
    setFilters((prev: any) => ({ ...prev, priceRange: e.target.value }));
  };
  return (
    <aside className="w-full max-w-xs">
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
                checked={filters.location?.includes(loc) || false}
                onChange={() => toggle("location", loc)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.location?.includes(loc) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.location?.includes(loc) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.location?.includes(loc)
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
      {/* Job Type */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Job Type</h3>
        <div className="space-y-2">
          {JOB_TYPES.map(type => (
            <label key={type} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{type}</span>
              <input
                type="checkbox"
                checked={filters.jobType?.includes(type) || false}
                onChange={() => toggle("jobType", type)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.jobType?.includes(type) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.jobType?.includes(type) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.jobType?.includes(type)
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
      {/* Job Category */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Job Category</h3>
        <div className="space-y-2">
          {JOB_CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{cat}</span>
              <input
                type="checkbox"
                checked={filters.jobCategory?.includes(cat) || false}
                onChange={() => toggle("jobCategory", cat)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.jobCategory?.includes(cat) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.jobCategory?.includes(cat) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.jobCategory?.includes(cat)
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
      {/* Experience Level */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Experience Level</h3>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map(level => (
            <label key={level} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{level}</span>
              <input
                type="checkbox"
                checked={filters.experienceLevel?.includes(level) || false}
                onChange={() => toggle("experienceLevel", level)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.experienceLevel?.includes(level) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.experienceLevel?.includes(level) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.experienceLevel?.includes(level)
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
      {/* Posting Date */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-black">Posting Date</h3>
        <div className="space-y-2">
          {POSTING_DATES.map(date => (
            <label key={date} className="flex items-center justify-between cursor-pointer text-base text-black">
              <span>{date}</span>
              <input
                type="checkbox"
                checked={filters.postingDate?.includes(date) || false}
                onChange={() => toggle("postingDate", date)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: filters.postingDate?.includes(date) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: filters.postingDate?.includes(date) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(filters.postingDate?.includes(date)
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
          <span className="text-xs text-gray-500">$200</span>
          <input
            type="range"
            min={200}
            max={800}
            value={filters.priceRange || 200}
            onChange={handleRange}
            className="w-full accent-sky-400"
          />
          <span className="text-xs text-gray-500">$800</span>
        </div>
      </div>
    </aside>
  );
}
