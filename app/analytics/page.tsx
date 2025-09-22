'use client'
import { useState, useEffect } from 'react'

interface ReadingTimeData {
  date: string
  minutes: number
}

interface DailyActivityData {
  hour: number
  articles: number
}

interface AnalyticsData {
  readingTime: ReadingTimeData[]
  categoryPreferences: Record<string, number>
  dailyActivity: DailyActivityData[]
  topSources: string[]
}

// Simple Line Chart Component (replacement for Recharts)
const SimpleLineChart: React.FC<{ data: ReadingTimeData[] }> = ({ data }) => {
  const maxMinutes = Math.max(...data.map(d => d.minutes))
  const chartHeight = 200

  return (
    <div className="relative">
      <svg width="100%" height={chartHeight} className="overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(value => (
          <g key={value}>
            <line
              x1="0"
              y1={chartHeight - (value / 100) * chartHeight}
              x2="100%"
              y2={chartHeight - (value / 100) * chartHeight}
              stroke="#e5e7eb"
              strokeDasharray="3,3"
            />
            <text
              x="0"
              y={chartHeight - (value / 100) * chartHeight - 5}
              fontSize="12"
              fill="#6b7280"
            >
              {Math.round((value / 100) * maxMinutes)}
            </text>
          </g>
        ))}
        
        {/* Line */}
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={data.map((d, i) => 
            `${(i / (data.length - 1)) * 100}%,${chartHeight - (d.minutes / maxMinutes) * chartHeight}`
          ).join(' ')}
        />
        
        {/* Points */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={`${(i / (data.length - 1)) * 100}%`}
            cy={chartHeight - (d.minutes / maxMinutes) * chartHeight}
            r="4"
            fill="#3b82f6"
          />
        ))}
      </svg>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        {data.map((d, i) => (
          <span key={i}>{new Date(d.date).toLocaleDateString()}</span>
        ))}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    readingTime: [],
    categoryPreferences: {},
    dailyActivity: [],
    topSources: []
  })

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    // Simulate analytics data
    const data: AnalyticsData = {
      readingTime: [
        { date: '2024-01-01', minutes: 45 },
        { date: '2024-01-02', minutes: 32 },
        { date: '2024-01-03', minutes: 58 },
        { date: '2024-01-04', minutes: 41 },
        { date: '2024-01-05', minutes: 67 }
      ],
      categoryPreferences: {
        Technology: 35,
        Business: 25,
        World: 20,
        Sports: 20
      },
      dailyActivity: [
        { hour: 9, articles: 5 },
        { hour: 12, articles: 8 },
        { hour: 18, articles: 12 }
      ],
      topSources: ['BBC News', 'CNN', 'Reuters', 'Associated Press']
    }
    setAnalytics(data)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reading Analytics</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Reading Time Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Daily Reading Time</h3>
          <SimpleLineChart data={analytics.readingTime} />
        </div>

        {/* Category Preferences */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Reading Preferences</h3>
          {Object.entries(analytics.categoryPreferences).map(([category, percentage]) => (
            <div key={category} className="mb-3">
              <div className="flex justify-between mb-1">
                <span>{category}</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{width: `${percentage}%`}}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Top Sources */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Top Sources</h3>
          <div className="space-y-2">
            {analytics.topSources.map((source, index) => (
              <div key={source} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-medium">#{index + 1} {source}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Reading Activity by Hour</h3>
          <div className="space-y-3">
            {analytics.dailyActivity.map((activity) => (
              <div key={activity.hour} className="flex items-center">
                <span className="w-12 text-sm text-gray-600">
                  {activity.hour}:00
                </span>
                <div className="flex-1 ml-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-500 h-4 rounded-full flex items-center justify-center" 
                      style={{width: `${(activity.articles / 15) * 100}%`}}
                    >
                      <span className="text-xs text-white font-medium">
                        {activity.articles}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}