import "server-only";
import { PostDetailDto } from "@/app/_modules/post/dto/post-detail.dto";
import { PostListDto } from "@/app/_modules/post/dto/post-list.dto";
import { CreatePostRequestDto } from "./dto/create-post-request.dto";
import { auth } from "@/app/_lib/authentication/auth";
import { tr } from "zod/v4/locales";
const baseUrl = "/api/posts";

// Fetches a single post by its ID from the posts API and returns its details.
// Parameters:
//   id (string): The unique identifier of the post to fetch.
// Returns:
//   Promise<PostDetailDto>: A promise that resolves to the details of the post.
export async function fetchPostById(id: string): Promise<PostDetailDto> {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.statusText}`);
  return res.json();
}

// Retrieves a list of posts from the posts API and returns them as an array.
// Parameters: None
// Returns:
//   Promise<PostListDto[]>: A promise that resolves to an array of post details.
export async function fetchAllPosts(): Promise<PostListDto> {
  try {
    const res = await fetch(`${baseUrl}/all`);
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchAvaliablePosts(): Promise<PostListDto> {
  try {
    const res = await fetch(`${baseUrl}/available`);
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchMemberPosts(): Promise<PostListDto> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  try {
    const res = await fetch(`${baseUrl}/my-posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function createPost(dto: CreatePostRequestDto): Promise<string> {
  const session = await auth();
  console.log("creat post session: ", session);
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    throw new Error(`Failed to create post: ${res.statusText}`);
  }

  const data = await res.json();
  return data.id; // Assuming the API returns the created post's ID
}
