"use client"
import Image from "next/image"

const book = {
  id: 1,
  title: "Bull: A History of the Boom and Bust, 1982-2004",
  image: '/ebook.png',
  author: {
    name: "Maggie Mahar",
    bio: "Author",
  },
  rating: 4.8,
  reviews: 55,
  pages: 528,
  language: "English",
  format: "pdf, Printed",
  publishDate: "Oct. 12th, 2004",
  isbn10: "0060564148",
  isbn13: "9780060564148",
  overview:
    "Bull! tells the extraordinary story of the boom and bust that dominated the world's most important stock market for almost twenty years. With vivid characters and sharp analysis, Maggie Mahar chronicles the greed, the fear, and the hope that drove the great bull market of 1982 to 2000—and the bear market that followed.",
  description:
    "This is the extraordinary story of the boom and bust that dominated the world's most important stock market for almost twenty years. With vivid characters and sharp analysis, Maggie Mahar chronicles the greed, the fear, and the hope that drove the great bull market of 1982 to 2000—and the bear market that followed. Drawing on unprecedented access to the players who powered and shaped the market, Bull! captures how the media, politicians, and even ordinary investors fueled the market's rise and fall. Here are the true stories behind the public dramas: the personalities, ambitions, and battles that created the longest-running bull market in U.S. history—and the spectacular crash that ended it all.",
}

const reviews = [
  {
    id: 1,
    author: "Wagnerscott95",
    date: "December 23, 2024 | 6:51 PM",
    rating: 5,
    text: "I found this conclusion to the Legacy of Orisha series satisfying, but quite a bit of time between reading the previous books and this one made me less invested in the story.",
  },
  {
    id: 2,
    author: "oldmanwalkingmall",
    date: "December 19, 2024 | 5:59 PM",
    rating: 4,
    text: "Trigger Warnings: Gore, blood, torture, death, war, genocide Zélie thought her battles were over once she seized the royal palace, but they were only just beginning.",
  },
  {
    id: 3,
    author: "desilovess",
    date: "November 28, 2024 | 1:56 PM",
    rating: 5,
    text: "I actually maybe it was the 5 year wait for the ending of this trilogy, but I wasn't vested in the story's conclusion as I was with the start of the series Children of Blood and Bone.",
  },
]

export default function EBookDetail() {
  return (
    <div className="min-h-screen">
      <div className="container w-full mx-auto px-4 py-16">
        <div className="flex gap-8">
          {/* Left Column - Book Cover Only */}
          <div className="w-80 flex-shrink-0">
            <Image
              src={book.image || "/placeholder.svg"}
              alt={book.title}
              width={300}
              height={400}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Right Column - All Information */}
          <div className="flex-1">
            {/* Book Details Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-blue-600 mb-1">by {book.author.name} (Author)</p>
                <p className="text-sm text-gray-600 mb-4">Format: pdf, Printed</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-semibold">{book.rating}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({book.reviews} Reviews)</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">#Best Seller in Southern United State Economic Category</p>

                <div className="flex gap-4 mb-8">
                  <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-50">
                    Read Sample
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded font-medium">
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Overview Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Format</span>
                  <span className="font-medium">pdf, Printed</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">English</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Publisher</span>
                  <span className="font-medium">HarperCollins Publishers</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Publication Date</span>
                  <span className="font-medium">Oct. 12th, 2004</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Pages</span>
                  <span className="font-medium">528</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">ISBN-13</span>
                  <span className="font-medium">9780060564148</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="font-medium">5.31 x 8.00 x 1.19 inches</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">ISBN-10</span>
                  <span className="font-medium">0060564148</span>
                </div>
              </div>
            </div>

            {/* Customer Rating & Reviews Section */}
            <div className="flex gap-8 mb-8">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-6">Customer Ranking & Reviews</h2>

                <div className="flex items-start gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{book.rating}</div>
                    <div className="flex text-yellow-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">({book.reviews} Reviews)</div>
                  </div>

                  <div className="flex-1">
                    {[
                      { stars: 5, count: 35 },
                      { stars: 4, count: 8 },
                      { stars: 3, count: 6 },
                      { stars: 2, count: 4 },
                      { stars: 1, count: 2 },
                    ].map((item) => (
                      <div key={item.stars} className="flex items-center gap-3 mb-2">
                        <span className="text-sm w-12">{item.stars} Star</span>
                        <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${(item.count / 55) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm w-8 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-64">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Leave Your Feedback</h3>
                  <p className="text-sm text-gray-600 mb-4">Share your thoughts with other readers</p>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Write A Review
                  </button>
                </div>
              </div>
            </div>

            {/* Product Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Product Reviews</h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm">Sort:</span>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>Recent</option>
                    <option>Most Helpful</option>
                    <option>Highest Rating</option>
                  </select>
                  <span className="text-sm">Filter:</span>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>All Star</option>
                    <option>5 Stars</option>
                    <option>4 Stars</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{review.author}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{review.date}</p>
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
