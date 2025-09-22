import { useState, useEffect } from 'react'

interface UserPreferences {
  favoriteCategories: string[]
  readArticles: string[]
  bookmarkedArticles: string[]
  theme: 'light' | 'dark'
  language: string
}

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    favoriteCategories: [],
    readArticles: [],
    bookmarkedArticles: [],
    theme: 'light',
    language: 'en'
  })

  // Initialize with default values on mount
  useEffect(() => {
    // Since localStorage isn't available in artifacts, we'll start with defaults
    // In a real application, you would load from localStorage here
    setPreferences({
      favoriteCategories: ['Technology', 'Business'],
      readArticles: [],
      bookmarkedArticles: [],
      theme: 'light',
      language: 'en'
    })
  }, [])

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates }
    setPreferences(newPreferences)
    // In a real application, you would save to localStorage here
    // localStorage.setItem('newsapp_preferences', JSON.stringify(newPreferences))
  }

  const toggleBookmark = (articleUrl: string) => {
    const bookmarked = preferences.bookmarkedArticles.includes(articleUrl)
    const newBookmarks = bookmarked
      ? preferences.bookmarkedArticles.filter(url => url !== articleUrl)
      : [...preferences.bookmarkedArticles, articleUrl]
    
    updatePreferences({ bookmarkedArticles: newBookmarks })
  }

  const markAsRead = (articleUrl: string) => {
    if (!preferences.readArticles.includes(articleUrl)) {
      updatePreferences({ 
        readArticles: [...preferences.readArticles, articleUrl] 
      })
    }
  }

  const isBookmarked = (articleUrl: string): boolean => {
    return preferences.bookmarkedArticles.includes(articleUrl)
  }

  const isRead = (articleUrl: string): boolean => {
    return preferences.readArticles.includes(articleUrl)
  }

  return {
    preferences,
    updatePreferences,
    toggleBookmark,
    markAsRead,
    isBookmarked,
    isRead
  }
}