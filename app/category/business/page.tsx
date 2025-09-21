// app/category/business/page.tsx
import NewsCard from "@/app/components/NewsCard"
import Link from "next/link"
import { FaBriefcase, FaChartLine, FaArrowLeft } from "react-icons/fa"
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
  title: 'Business News - NewsHub Pro',
  description: 'Latest business news, market trends, and financial developments.',
}

export default async function BusinessPage() {
  let articles: Article[] = []
  let error: string | null = null
  let totalResults = 0

  try {
    if (!process.env.NEWS_API_KEY) {
      throw new Error("NEWS_API_KEY environment variable is not set")
    }

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=business&pageSize=12&apiKey=${process.env.NEWS_API_KEY}`,
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
    console.error("Error fetching business news:", err)
    error = err instanceof Error ? err.message : "Failed to fetch news"
    
    // Professional fallback data for business
    articles = [
      {
        title: "Tech Startups Drive Innovation in Financial Services",
        description: "Emerging fintech companies are revolutionizing traditional banking with AI-powered solutions and blockchain technology integration.",
        url: "https://techcrunch.com",
        urlToImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Business Weekly" },
        author: "Financial Reporter"
      },
      {
        title: "Sustainable Business Practices Show Strong ROI",
        description: "Companies implementing environmental and social governance strategies report increased profitability and enhanced brand reputation.",
        url: "https://forbes.com",
        urlToImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Forbes Business" },
        author: "Sustainability Expert"
      },
      {
        title: "Remote Work Transforms Corporate Real Estate",
        description: "Organizations are reimagining office spaces and embracing hybrid work models, leading to significant changes in commercial property markets.",
        url: "https://wsj.com",
        urlToImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Wall Street Journal" },
        author: "Business Correspondent"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-amber-200 hover:text-white transition-colors mr-4"
            >
              <FaArrowLeft />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <FaBriefcase className="text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Business News</h1>
              <p className="text-amber-100 text-lg">Market insights and corporate developments</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaChartLine className="text-green-400" />
              <span>{totalResults > 0 ? `${totalResults} business stories` : 'Market coverage'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaChartLine className="text-blue-400" />
              <span>Real-time market data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {error && (
          <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-1 bg-orange-400 rounded-full">
                  <FaBriefcase className="text-white text-xs" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800">Demo Mode - Business</h3>
                <p className="text-sm text-orange-700 mt-1">
                  Showing sample business content. Configure API key for live market news.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <NewsCard key={`business-${article.url}-${index}`} article={article} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaChartLine />
            <span>Load More Business Stories</span>
          </button>
        </div>
      </section>
    </div>
  )
}