// app/category/world/page.tsx
import NewsCard from "@/app/components/NewsCard"
import Link from "next/link"
import { FaGlobe, FaMapMarkerAlt, FaNewspaper, FaArrowLeft } from "react-icons/fa"
// import NewsCard from "@/components/NewsCard"

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

export const metadata = {
  title: 'World News - NewsHub Pro',
  description: 'Breaking world news, international affairs, and global developments.',
}

export default async function WorldPage() {
  let articles: Article[] = []
  let error: string | null = null
  let totalResults = 0

  try {
    if (!process.env.NEWS_API_KEY) {
      throw new Error("NEWS_API_KEY environment variable is not set")
    }

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=general&pageSize=12&apiKey=${process.env.NEWS_API_KEY}`,
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
    console.error("Error fetching world news:", err)
    error = err instanceof Error ? err.message : "Failed to fetch news"
    
    // Professional fallback data for world news
    articles = [
      {
        title: "Global Climate Summit Addresses Urgent Environmental Challenges",
        description: "World leaders gather to discuss comprehensive strategies for combating climate change and promoting sustainable development across all continents.",
        url: "https://un.org",
        urlToImage: "https://images.unsplash.com/photo-1569163139394-de44885c7d89?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Global News Network" },
        author: "International Correspondent"
      },
      {
        title: "International Trade Relations Show Signs of Recovery",
        description: "Economic indicators suggest strengthening partnerships between major economies, with new trade agreements fostering global cooperation.",
        url: "https://wto.org",
        urlToImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Economic Times" },
        author: "Trade Analyst"
      },
      {
        title: "Humanitarian Aid Efforts Expand Across Multiple Regions",
        description: "International organizations coordinate relief efforts to provide essential support to communities affected by recent global challenges.",
        url: "https://who.int",
        urlToImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "World Health Organization" },
        author: "Humanitarian Reporter"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-600 via-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-green-200 hover:text-white transition-colors mr-4"
            >
              <FaArrowLeft />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <FaGlobe className="text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">World News</h1>
              <p className="text-green-100 text-lg">Global perspectives and international affairs</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-400" />
              <span>{totalResults > 0 ? `${totalResults} global stories` : 'Worldwide coverage'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaNewspaper className="text-pink-400" />
              <span>24/7 international reporting</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {error && (
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-l-4 border-teal-400 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-1 bg-teal-400 rounded-full">
                  <FaGlobe className="text-white text-xs" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-teal-800">Demo Mode - World News</h3>
                <p className="text-sm text-teal-700 mt-1">
                  Showing sample global content. Configure API key for live world news.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <NewsCard key={`world-${article.url}-${index}`} article={article} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaGlobe />
            <span>Load More World Stories</span>
          </button>
        </div>
      </section>
    </div>
  )
}