import Link from 'next/link'
import { FaExternalLinkAlt, FaClock, FaUser } from 'react-icons/fa'

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

interface NewsCardProps {
  article: Article
}

const NewsCard = ({ article }: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {article.urlToImage && (
        <div className="relative overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
              {article.source.name}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <FaClock />
          <span>{formatDate(article.publishedAt)}</span>
          {article.author && (
            <>
              <span>•</span>
              <FaUser />
              <span className="truncate">{article.author}</span>
            </>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-tight line-clamp-2">
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            {article.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {article.description || "No description available."}
        </p>
        
        <Link
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          Read More
          <FaExternalLinkAlt className="text-xs" />
        </Link>
      </div>
    </article>
  )
}

export default NewsCard
