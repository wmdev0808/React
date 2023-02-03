import type Post from "../types/Post";
import { PostInput } from "../types/Post";
import { sleep } from "./sleep";

export async function getPosts<Post>(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw { message: "Failed to fetch posts.", status: 500 };
  }
  return response.json() as Promise<Post[]>;
}

export async function getSlowPosts<Post>(): Promise<Post[]> {
  await sleep(2000);
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw { message: "Failed to fetch posts.", status: 500 };
  }
  return response.json() as Promise<Post[]>;
}

export async function getPost<Post>(id?: string): Promise<Post> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + id
  );
  if (!response.ok) {
    throw { message: "Failed to fetch post.", status: 500 };
  }
  return response.json() as Promise<Post>;
}

export async function savePost(post: PostInput): Promise<void> {
  if (
    (post.title as string).trim().length < 5 ||
    (post.body as string).trim().length < 10
  ) {
    throw { message: "Invalid input data provided.", status: 422 };
  }

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw { message: "Could not save post.", status: 500 };
  }
}
