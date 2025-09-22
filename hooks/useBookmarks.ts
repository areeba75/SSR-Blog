// hooks/useBookmarks.ts
'use client'
import { useState, useEffect } from 'react'

type Article = {
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    name: string
  }
  author?: string | null
  bookmarkedAt?: string // When the user saved it
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Article[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load bookmarks from localStorage when hook initializes
  useEffect(() => {
    try {
      const saved = localStorage.getItem('newsapp_bookmarks')
      if (saved) {
        const parsedBookmarks = JSON.parse(saved)
        setBookmarks(parsedBookmarks)
      }
    } catch (error) {
      console.error('Failed to load bookmarks from localStorage:', error)
      // Clear corrupted data
      localStorage.removeItem('newsapp_bookmarks')
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save bookmarks to localStorage whenever bookmarks change
  const saveToStorage = (newBookmarks: Article[]) => {
    try {
      localStorage.setItem('newsapp_bookmarks', JSON.stringify(newBookmarks))
    } catch (error) {
      console.error('Failed to save bookmarks to localStorage:', error)
    }
  }

  // Add an article to bookmarks
  const addBookmark = (article: Article) => {
    const articleWithTimestamp = {
      ...article,
      bookmarkedAt: new Date().toISOString()
    }
    
    const newBookmarks = [...bookmarks, articleWithTimestamp]
    setBookmarks(newBookmarks)
    saveToStorage(newBookmarks)
  }

  // Remove an article from bookmarks
  const removeBookmark = (url: string) => {
    const newBookmarks = bookmarks.filter(article => article.url !== url)
    setBookmarks(newBookmarks)
    saveToStorage(newBookmarks)
  }

  // Check if an article is bookmarked
  const isBookmarked = (url: string): boolean => {
    return bookmarks.some(article => article.url === url)
  }

  // Toggle bookmark status (add if not bookmarked, remove if bookmarked)
  const toggleBookmark = (article: Article) => {
    if (isBookmarked(article.url)) {
      removeBookmark(article.url)
    } else {
      addBookmark(article)
    }
  }

  // Get bookmark by URL
  const getBookmark = (url: string): Article | undefined => {
    return bookmarks.find(article => article.url === url)
  }

  // Clear all bookmarks
  const clearAllBookmarks = () => {
    setBookmarks([])
    localStorage.removeItem('newsapp_bookmarks')
  }

  return {
    bookmarks,              // Array of all bookmarked articles
    isLoaded,              // Boolean indicating if data has loaded from localStorage
    addBookmark,           // Function to add an article to bookmarks
    removeBookmark,        // Function to remove an article from bookmarks
    isBookmarked,          // Function to check if article is bookmarked
    toggleBookmark,        // Function to toggle bookmark status
    getBookmark,           // Function to get a specific bookmark
    clearAllBookmarks,     // Function to clear all bookmarks
    bookmarkCount: bookmarks.length // Number of bookmarks
  }
}