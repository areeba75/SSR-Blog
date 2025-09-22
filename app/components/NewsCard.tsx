'use client'
import Link from 'next/link'
import { FaExternalLinkAlt, FaClock, FaUser, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useBookmarks } from '@/hooks/useBookmarks'

type Article = {
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    name: string
  }
  author?: string | null // Made optional
}

interface NewsCardProps {
  article: Article
}

const NewsCard = ({ article }: NewsCardProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const bookmarked = isBookmarked(article.url)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent any parent link clicks
    toggleBookmark(article)
  }

  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {article.urlToImage && (
        <div className="relative overflow-hidden">
          <img
  src={article.urlToImage || "default.jpg"}
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
              {article.source.name}
            </span>
          </div>
          
          {/* Bookmark button on image */}
          <div className="absolute top-3 right-3">
            <button
              onClick={handleBookmarkClick}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                bookmarked 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white/80 text-gray-600 hover:bg-blue-600 hover:text-white'
              }`}
              aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
              title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
            >
              {bookmarked ? <FaBookmark className="text-sm" /> : <FaRegBookmark className="text-sm" />}
            </button>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FaClock />
            <span>{formatDate(article.publishedAt)}</span>
            {article.author && (
              <>
                <span>•</span>
                <FaUser />
                <span className="truncate max-w-24">{article.author}</span>
              </>
            )}
          </div>
          
          {/* Bookmark button for articles without images */}
          {!article.urlToImage && (
            <button
              onClick={handleBookmarkClick}
              className={`p-2 rounded-full transition-all duration-300 ${
                bookmarked 
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
              aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
              title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
            >
              {bookmarked ? <FaBookmark className="text-sm" /> : <FaRegBookmark className="text-sm" />}
            </button>
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
        
        <div className="flex items-center justify-between">
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Read More
            <FaExternalLinkAlt className="text-xs" />
          </Link>
          
          {/* Bookmark status indicator */}
          {bookmarked && (
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Saved
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default NewsCard