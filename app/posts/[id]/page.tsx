import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function Post({ params }: Props) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>Post not found</p>;
  }

  const post = await res.json();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <Link href="/">&larr; Back to posts</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}
