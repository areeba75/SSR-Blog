'use client'
import { useState } from 'react'
import { FaSearch, FaSpinner } from 'react-icons/fa'
import NewsCard from '../components/NewsCard'
// import NewsCard from '@/components/NewsCard'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setHasSearched(true)

    try {
      // Use NewsAPI's everything endpoint for search
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setResults(data.articles || [])
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search News</h1>
          <p className="text-gray-600">Find articles from thousands of sources worldwide</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for news articles..."
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
              Search
            </button>
          </div>
        </form>

        {/* Results */}
        {isLoading && (
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p>Searching news articles...</p>
          </div>
        )}

        {hasSearched && !isLoading && (
          <div>
            <p className="text-gray-600 mb-6">
              Found {results.length} articles for &quot;{query}&quot;
            </p>
            
            {results.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((article, index) => (
                  <NewsCard key={`search-${index}`} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No articles found. Try different keywords.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}