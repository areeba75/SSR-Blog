// app/page.tsx
import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa";
type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
};

export default async function Home() {
  // ✅ Fetch live news with your API key
 const res = await fetch(
  `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${process.env.NEWS_API_KEY}`,
  { cache: "no-store" }
);

  const data = await res.json();
  const articles: Article[] = data.articles;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-center gap-2">
<FaRegNewspaper className="text-2xl"/>
      <h1 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-black to-purple-600 bg-clip-text text-transparent">
            Top Headlines Today

      </h1></div>
      <p className="text-center text-gray-800 mb-12">
Fresh news fetched and rendered server-side with Next.js.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, index) => (
          <article
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
          >
            {a.urlToImage && (
              <img
                src={a.urlToImage}
                alt={a.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                <Link
                  href={a.url}
                  target="_blank"
                  className="hover:text-blue-600 transition"
                >
                  {a.title}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm flex-grow line-clamp-3">
                {a.description || "No description available."}
              </p>
              <Link
                href={a.url}
                target="_blank"
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
