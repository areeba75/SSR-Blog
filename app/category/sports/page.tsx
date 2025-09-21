// app/category/sports/page.tsx
import NewsCard from "@/app/components/NewsCard"
import Link from "next/link"
import { FaFutbol, FaTrophy, FaMedal, FaArrowLeft } from "react-icons/fa"
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
  title: 'Sports News - NewsHub Pro',
  description: 'Latest sports news, scores, and athletic achievements from around the world.',
}

export default async function SportsPage() {
  let articles: Article[] = []
  let error: string | null = null
  let totalResults = 0

  try {
    if (!process.env.NEWS_API_KEY) {
      throw new Error("NEWS_API_KEY environment variable is not set")
    }

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=sports&pageSize=12&apiKey=${process.env.NEWS_API_KEY}`,
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
    console.error("Error fetching sports news:", err)
    error = err instanceof Error ? err.message : "Failed to fetch news"
    
    // Professional fallback data for sports
    articles = [
      {
        title: "Championship Finals Draw Record-Breaking Viewership",
        description: "Global audiences tune in for the most-watched sporting event of the year, showcasing incredible athletic performances and competitive spirit.",
        url: "https://espn.com",
        urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Sports Network" },
        author: "Sports Reporter"
      },
      {
        title: "Olympic Training Programs Embrace Advanced Technology",
        description: "Athletes worldwide are using cutting-edge training methods and performance analytics to prepare for upcoming international competitions.",
        url: "https://olympic.org",
        urlToImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Olympic Committee" },
        author: "Athletic Performance Specialist"
      },
      {
        title: "Youth Sports Programs Show Remarkable Growth",
        description: "Community sports initiatives are expanding access to athletic opportunities for young people, promoting health and teamwork across diverse communities.",
        url: "https://youth-sports.org",
        urlToImage: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Youth Athletics Today" },
        author: "Community Sports Coordinator"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-emerald-200 hover:text-white transition-colors mr-4"
            >
              <FaArrowLeft />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <FaFutbol className="text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Sports News</h1>
              <p className="text-emerald-100 text-lg">Athletic achievements and competitive updates</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaTrophy className="text-yellow-400" />
              <span>{totalResults > 0 ? `${totalResults} sports stories` : 'Competition coverage'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMedal className="text-gold-400" />
              <span>Live scores and highlights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {error && (
          <div className="mb-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-400 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-1 bg-cyan-400 rounded-full">
                  <FaFutbol className="text-white text-xs" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-cyan-800">Demo Mode - Sports</h3>
                <p className="text-sm text-cyan-700 mt-1">
                  Showing sample sports content. Configure API key for live sports news.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <NewsCard key={`sports-${article.url}-${index}`} article={article} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaTrophy />
            <span>Load More Sports Stories</span>
          </button>
        </div>
      </section>
    </div>
  )
}