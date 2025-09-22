// app/bookmarks/page.tsx
'use client'
import { useBookmarks } from '@/hooks/useBookmarks'
// import NewsCard from '@/components/NewsCard'
import Link from 'next/link'
import { FaBookmark, FaArrowLeft, FaRegBookmark, FaTrash, FaSpinner } from 'react-icons/fa'
import NewsCard from '../components/NewsCard'

export default function BookmarksPage() {
  const { bookmarks, isLoaded, clearAllBookmarks, bookmarkCount } = useBookmarks()

  // Show loading spinner while data loads from localStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your bookmarks...</p>
        </div>
      </div>
    )
  }

  const handleClearAll = () => {
    if (window.confirm(`Are you sure you want to remove all ${bookmarkCount} bookmarks?`)) {
      clearAllBookmarks()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors mr-6"
            >
              <FaArrowLeft />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <FaBookmark className="text-3xl" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Your Bookmarks</h1>
                <p className="text-purple-100 text-lg">
                  {bookmarkCount === 0 
                    ? 'No saved articles yet' 
                    : `${bookmarkCount} saved ${bookmarkCount === 1 ? 'article' : 'articles'}`
                  }
                </p>
              </div>
            </div>

            {/* Clear All Button */}
            {bookmarkCount > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-100 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <FaTrash className="text-sm" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {bookmarks.length > 0 ? (
          <>
            {/* Sort/Filter Options */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600">
                Articles saved for later reading
              </p>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">By Title</option>
              </select>
            </div>

            {/* Bookmarked Articles Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {bookmarks.map((article, index) => (
                <div key={`bookmark-${article.url}-${index}`} className="relative">
                  <NewsCard article={article} />
                  
                  {/* Bookmark date indicator */}
                  {article.bookmarkedAt && (
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                        Saved {new Date(article.bookmarkedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More (Future enhancement) */}
            <div className="text-center mt-12">
              <p className="text-gray-500 text-sm">
                All your bookmarks are displayed above
              </p>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <FaRegBookmark className="text-8xl text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">No bookmarks yet</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Start exploring and save interesting articles to read later. 
                Click the bookmark icon on any article to save it here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Headlines
                </Link>
                <Link 
                  href="/search" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Search Articles
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}