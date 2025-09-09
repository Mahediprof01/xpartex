
interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  trendingTopics: string[];
  selectedTrending: string;
  onTrendingChange: (topic: string) => void;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  trendingTopics,
  selectedTrending,
  onTrendingChange,
}: FilterSidebarProps) {
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-8 text-black">Filter</h2>
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-5 text-black">Product Category</h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center justify-between cursor-pointer text-lg font-medium text-black">
              <span>{cat}</span>
              <input
                type="checkbox"
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: selectedCategory === cat ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: selectedCategory === cat ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(selectedCategory === cat
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
      <div>
        <h3 className="text-xl font-bold mb-5 text-black">Trending Topics</h3>
        <div className="space-y-4">
          {trendingTopics.map((topic) => (
            <label key={topic} className="flex items-center justify-between cursor-pointer text-lg font-medium text-black">
              <span>{topic}</span>
              <input
                type="checkbox"
                checked={selectedTrending === topic}
                onChange={() => onTrendingChange(topic)}
                className="w-5 h-5 border-2 border-sky-400 rounded-none focus:ring-0 accent-sky-500 bg-white checked:bg-sky-500 checked:border-sky-500"
                style={{
                  accentColor: selectedTrending === topic ? '#0ea5e9' : undefined,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: selectedTrending === topic ? '#0ea5e9' : '#fff',
                  border: '2px solid #0ea5e9',
                  borderRadius: 0,
                  position: 'relative',
                  outline: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  ...(selectedTrending === topic
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
