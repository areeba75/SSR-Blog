// pages/index.tsx
import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";

type Post = { id: number; title: string; body: string };

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>SSR Blog — Demo</h1>
      <p>Server-side rendered posts (demo using jsonplaceholder)</p>
      <ul>
        {posts.map((p) => (
          <li key={p.id} style={{ marginBottom: 16 }}>
            <h3><Link href={`/posts/${p.id}`}>{p.title}</Link></h3>
            <p>{p.body.substring(0, 120)}...</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
  const posts = await res.json();
  return { props: { posts } };
};
