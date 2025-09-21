// app/page.tsx
import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
};

type NewsApiResponse = {
  articles: Article[];
  status: string;
  totalResults: number;
};

export default async function Home() {
  let articles: Article[] = [];
  let error: string | null = null;

  try {
    // Check if API key exists
    if (!process.env.NEWS_API_KEY) {
      throw new Error("NEWS_API_KEY environment variable is not set");
    }

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${process.env.NEWS_API_KEY}`,
      { 
        cache: "no-store",
        headers: {
          'User-Agent': 'NewsApp/1.0'
        }
      }
    );

    if (!res.ok) {
      throw new Error(`News API responded with status: ${res.status}`);
    }

    const data: NewsApiResponse = await res.json();
    
    if (data.status !== 'ok') {
      throw new Error(`News API error: ${data.status}`);
    }

    articles = data.articles || [];
  } catch (err) {
    console.error("Error fetching news:", err);
    error = err instanceof Error ? err.message : "Failed to fetch news";
    
    // Fallback mock data for development/testing
    articles = [
      {
        title: "Sample News Article",
        description: "This is a fallback article when the API fails.",
        url: "https://example.com",
        urlToImage: null
      }
    ];
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-center gap-2 mb-8">
        <FaRegNewspaper className="text-2xl" />
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-black to-purple-600 bg-clip-text text-transparent">
          Top Headlines Today
        </h1>
      </div>
      
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
          <p className="font-bold">Notice:</p>
          <p>Using fallback content. {error}</p>
        </div>
      )}

      <p className="text-center text-gray-800 mb-12">
        Fresh news fetched and rendered server-side with Next.js.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 6).map((article, index) => (
          <article
            key={`${article.url}-${index}`}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-3 overflow-hidden">
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm flex-grow overflow-hidden">
                {article.description || "No description available."}
              </p>
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                Read full article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}