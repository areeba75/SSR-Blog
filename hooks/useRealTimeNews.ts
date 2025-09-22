import { useState, useEffect } from 'react'

interface NewsArticle {
  id: string
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
  source: {
    id: string
    name: string
  }
}

interface LiveUpdateResponse {
  newArticles: NewsArticle[]
}

export const useRealTimeNews = (category: string = 'general') => {
  const [liveUpdates, setLiveUpdates] = useState<NewsArticle[]>([])
  const [updateCount, setUpdateCount] = useState(0)

  useEffect(() => {
    // Simulate real-time updates every 2 minutes
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/live-updates?category=${category}`)
        const data: LiveUpdateResponse = await response.json()
        
        if (data.newArticles?.length > 0) {
          setLiveUpdates(prev => [...data.newArticles, ...prev.slice(0, 4)])
          setUpdateCount(prev => prev + data.newArticles.length)
          
          // Show notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('NewsHub Pro', {
              body: `${data.newArticles.length} new articles available`,
              icon: '/favicon.ico'
            })
          }
        }
      } catch (error) {
        console.error('Failed to fetch live updates:', error)
      }
    }, 120000) // 2 minutes

    return () => clearInterval(interval)
  }, [category])

  const requestNotificationPermission = async (): Promise<void> => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }

  return {
    liveUpdates,
    updateCount,
    requestNotificationPermission
  }
}