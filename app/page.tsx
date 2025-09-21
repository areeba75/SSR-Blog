// app/page.tsx
import Link from "next/link"
import { FaRegNewspaper, FaClock, FaExternalLinkAlt, FaFire } from "react-icons/fa"
import NewsCard from "./components/NewsCard"
// import NewsCard from "@/components/NewsCard"
// import LoadingSpinner from "@/components/LoadingSpinner"

type Article = {
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    name: string
  }
  author: string | null
}

type NewsApiResponse = {
  articles: Article[]
  status: string
  totalResults: number
}

export default async function Home() {
  let articles: Article[] = []
  let error: string | null = null
  let totalResults = 0

  try {
    if (!process.env.NEWS_API_KEY) {
      throw new Error("NEWS_API_KEY environment variable is not set")
    }

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${process.env.NEWS_API_KEY}`,
      {
        cache: "no-store",
        headers: {
          'User-Agent': 'NewsHub-Pro/1.0'
        }
      }
    )

    if (!res.ok) {
      throw new Error(`News API responded with status: ${res.status}`)
    }

    const data: NewsApiResponse = await res.json()

    if (data.status !== 'ok') {
      throw new Error(`News API error: ${data.status}`)
    }

    articles = data.articles?.filter(article => 
      article.title && 
      article.description && 
      article.title !== '[Removed]' &&
      article.description !== '[Removed]'
    ) || []
    
    totalResults = data.totalResults

  } catch (err) {
    console.error("Error fetching news:", err)
    error = err instanceof Error ? err.message : "Failed to fetch news"
    
    // Professional fallback data
    articles = [
      {
        title: "Welcome to NewsHub Pro",
        description: "Experience real-time news with our modern Next.js application featuring server-side rendering and responsive design.",
        url: "https://github.com",
        urlToImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "NewsHub Pro" },
        author: "Areeba"
      },
      {
        title: "Built with Modern Web Technologies",
        description: "This application showcases Next.js 13+, TypeScript, Tailwind CSS, and professional development practices.",
        url: "https://nextjs.org",
        urlToImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Tech Stack" },
        author: "Development Team"
      }
    ]
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <FaFire className="text-4xl text-orange-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Breaking News,
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Real-Time
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Stay ahead with the latest global headlines powered by cutting-edge web technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <FaClock className="text-orange-400" />
                <span>Updated every minute</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-blue-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <FaRegNewspaper className="text-orange-400" />
                <span>{totalResults.toLocaleString()} stories today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {error && (
          <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-1 bg-orange-400 rounded-full">
                  <FaClock className="text-white text-xs" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800">Demo Mode Active</h3>
                <p className="text-sm text-orange-700 mt-1">
                  Showing sample content. Configure NEWS_API_KEY for live data.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Featured Article */}
        {articles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaFire className="text-orange-500" />
              Featured Story
            </h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="md:flex">
                {articles[0].urlToImage && (
                  <div className="md:w-1/2">
                    <img
                      src={articles[0].urlToImage}
                      alt={articles[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                      BREAKING
                    </span>
                    <span className="text-gray-500 text-sm">{articles[0].source.name}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                    {articles[0].title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {articles[0].description}
                  </p>
                  <Link
                    href={articles[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Read Full Story
                    <FaExternalLinkAlt className="text-sm" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Headlines</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(1, 15).map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
        </div>

        {/* Load More Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 cursor-pointer">
            <FaRegNewspaper />
            <span>More stories loading...</span>
          </div>
        </div>
      </section>
    </div>
  )
}
