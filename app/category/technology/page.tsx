// app/category/technology/page.tsx
import NewsCard from "@/app/components/NewsCard"
import Link from "next/link"
import { FaLaptop, FaRocket, FaCode, FaArrowLeft } from "react-icons/fa"
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
  title: 'Technology News - NewsHub Pro',
  description: 'Latest technology news, innovations, and developments from around the world.',
}

export default async function TechnologyPage() {
  let articles: Article[] = []
  let error: string | null = null
  let totalResults = 0

  try {
    if (!process.env.NEWS_API_KEY) {
      throw new Error("NEWS_API_KEY environment variable is not set")
    }

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&pageSize=12&apiKey=${process.env.NEWS_API_KEY}`,
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
    console.error("Error fetching technology news:", err)
    error = err instanceof Error ? err.message : "Failed to fetch news"
    
    // Professional fallback data for technology
    articles = [
      {
        title: "Next.js 14 Revolutionizes Web Development",
        description: "The latest version of Next.js brings groundbreaking features including improved server components and enhanced performance optimizations.",
        url: "https://nextjs.org",
        urlToImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Tech News" },
        author: "Development Team"
      },
      {
        title: "TypeScript Adoption Reaches New Heights",
        description: "Major companies worldwide are embracing TypeScript for better code reliability and developer experience in large-scale applications.",
        url: "https://typescriptlang.org",
        urlToImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "TypeScript Weekly" },
        author: "Microsoft Team"
      },
      {
        title: "AI Integration in Modern Web Applications",
        description: "Exploring how artificial intelligence is being seamlessly integrated into web development workflows and user experiences.",
        url: "https://openai.com",
        urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "AI Today" },
        author: "AI Research Team"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mr-4"
            >
              <FaArrowLeft />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <FaLaptop className="text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Technology News</h1>
              <p className="text-blue-100 text-lg">Latest innovations and tech developments</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaRocket className="text-orange-400" />
              <span>{totalResults > 0 ? `${totalResults} stories` : 'Latest stories'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCode className="text-green-400" />
              <span>Updated continuously</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {error && (
          <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-400 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-1 bg-orange-400 rounded-full">
                  <FaLaptop className="text-white text-xs" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800">Demo Mode - Technology</h3>
                <p className="text-sm text-orange-700 mt-1">
                  Showing sample tech content. Configure API key for live technology news.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <NewsCard key={`tech-${article.url}-${index}`} article={article} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaRocket />
            <span>Load More Tech Stories</span>
          </button>
        </div>
      </section>
    </div>
  )
}
