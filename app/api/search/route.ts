import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query) {
        return NextResponse.json({ error: 'Query parameter required' }, { status: 400 })
    }

    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=12&apiKey=${process.env.NEWS_API_KEY}`,
            {
                headers: {
                    'User-Agent': 'NewsHub-Pro/1.0'
                }
            }
        )

        if (!response.ok) {
            throw new Error(`NewsAPI responded with status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Search API error:', error)
        return NextResponse.json(
            { error: 'Search failed', articles: [] },
            { status: 500 }
        )
    }
}
