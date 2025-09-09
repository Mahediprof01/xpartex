import React from "react";

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  skillLevels: string[];
  selectedSkill: string;
  onSkillChange: (skill: string) => void;
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  durations: string[];
  selectedDuration: string;
  onDurationChange: (duration: string) => void;
  priceRange: [number, number];
  selectedPrice: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export default function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  skillLevels,
  selectedSkill,
  onSkillChange,
  languages,
  selectedLanguage,
  onLanguageChange,
  durations,
  selectedDuration,
  onDurationChange,
  priceRange,
  selectedPrice,
  onPriceChange,
}: FilterSidebarProps) {
  return (
    <div className="w-full max-w-xs">
      <h2 className="text-2xl font-bold mb-8 text-black">Filter</h2>
      {/* Category */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-black">Category</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center justify-between cursor-pointer text-base font-medium text-black">
              <span>{cat}</span>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onCategoryChange(cat)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: selectedCategories.includes(cat) ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: selectedCategories.includes(cat) ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(selectedCategories.includes(cat)
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
      {/* Skill Level */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-black">Skill Level</h3>
        <div className="space-y-3">
          {skillLevels.map((level) => (
            <label key={level} className="flex items-center justify-between cursor-pointer text-base font-medium text-black">
              <span>{level}</span>
              <input
                type="checkbox"
                checked={selectedSkill === level}
                onChange={() => onSkillChange(level)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: selectedSkill === level ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: selectedSkill === level ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(selectedSkill === level
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
      {/* Language */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-black">Language</h3>
        <div className="space-y-3">
          {languages.map((lang) => (
            <label key={lang} className="flex items-center justify-between cursor-pointer text-base font-medium text-black">
              <span>{lang}</span>
              <input
                type="checkbox"
                checked={selectedLanguage === lang}
                onChange={() => onLanguageChange(lang)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: selectedLanguage === lang ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: selectedLanguage === lang ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(selectedLanguage === lang
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
      {/* Duration */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-black">Duration</h3>
        <div className="space-y-3">
          {durations.map((d) => (
            <label key={d} className="flex items-center justify-between cursor-pointer text-base font-medium text-black">
              <span>{d}</span>
              <input
                type="checkbox"
                checked={selectedDuration === d}
                onChange={() => onDurationChange(d)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: selectedDuration === d ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: selectedDuration === d ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(selectedDuration === d
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
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-black">Price Range</h3>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-700">${priceRange[0]} - ${priceRange[1]}</span>
          <input
            type="range"
            min={priceRange[0]}
            max={priceRange[1]}
            value={selectedPrice[0]}
            onChange={e => onPriceChange([Number(e.target.value), selectedPrice[1]])}
            className="accent-sky-500"
          />
          <input
            type="range"
            min={priceRange[0]}
            max={priceRange[1]}
            value={selectedPrice[1]}
            onChange={e => onPriceChange([selectedPrice[0], Number(e.target.value)])}
            className="accent-sky-500"
          />
        </div>
      </div>
    </div>
  );
}
