import Post, { PostInput } from "../types/Post";

export async function getPosts<Post>(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw { message: "Failed to fetch posts.", status: 500 };
  }
  return response.json() as Promise<Post[]>;
}

export function getTest() {
  throw new Error();
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
  if (post.title.trim().length < 5 || post.body.trim().length < 10) {
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
