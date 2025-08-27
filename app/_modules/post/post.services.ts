import "server-only";
import { PostDetailDto } from "@/app/_modules/post/dto/post-detail.dto";
import { PostListDto } from "@/app/_modules/post/dto/post-list.dto";
import { CreatePostRequestDto } from "./dto/create-post-request.dto";
import { auth } from "@/app/_lib/authentication/auth";
import { BACKEND_URL } from "@/app/_lib/constant/backend";
const baseUrl = "/api/posts";

// Fetches a single post by its ID from the posts API and returns its details.
// Parameters:
//   id (string): The unique identifier of the post to fetch.
// Returns:
//   Promise<PostDetailDto>: A promise that resolves to the details of the post.
export async function fetchPostById(id: string): Promise<PostDetailDto> {
  try {
    console.log("Fetching post with ID:", encodeURIComponent(id));
    const res = await fetch(`${BACKEND_URL}/posts/${encodeURIComponent(id)}`);

    if (!res.ok) throw new Error(`Failed to fetch post: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(error);
    throw error; // Return null or handle the error as needed
  }
}

// Retrieves a list of posts from the posts API and returns them as an array.
// Parameters: None
// Returns:
//   Promise<PostListDto[]>: A promise that resolves to an array of post details.
export async function fetchAllPosts(): Promise<PostListDto> {
  try {
    const res = await fetch(`${BACKEND_URL}/posts/all`);
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchAvaliablePosts(): Promise<PostListDto> {
  try {
    const res = await fetch(`${BACKEND_URL}/posts/available`);
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchMemberPosts({
  status,
  search,
}: {
  status?: string | string[];
  search?: string;
}): Promise<PostListDto> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");
  
  const params: URLSearchParams = new URLSearchParams();
  if (status) {
    if (typeof status === "string") {
      params.append("language", status);
    } else if (Array.isArray(status)) {
      status.forEach((s) => params.append("status", s));
    }
  }
  if (search) params.append("search", search);

  try {
    const res = await fetch(
      `${BACKEND_URL}/posts/my-posts${params ? "?" : ""}${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function searchPosts({
  languages,
  categories,
  search,
  order,
}: {
  languages?: string | string[];
  categories?: string | string[];
  search?: string;
  order?: "asc" | "desc";
}): Promise<PostListDto> {
  const params: URLSearchParams = new URLSearchParams();
  if (languages) {
    if (typeof languages === "string") {
      params.append("language", languages);
    } else if (Array.isArray(languages)) {
      languages.forEach((lang) => params.append("language", lang));
    }
  }
  if (categories) {
    if (typeof categories === "string") {
      params.append("category", categories);
    } else if (Array.isArray(categories)) {
      categories.forEach((cat) => params.append("category", cat));
    }
  }

  if (search) params.append("search", search);
  if (order) params.append("order", order);

  console.log("Searching posts with params:", params.toString());

  try {
    const res = await fetch(
      `${BACKEND_URL}/posts${params ? "?" : ""}${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) throw new Error(`Failed to search posts: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function createPost(dto: CreatePostRequestDto): Promise<string> {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");
    console.log("Creating post with data:", dto);
    const res = await fetch(`${BACKEND_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) {
      throw new Error(`Failed to create post: ${res.statusText}`);
    }

    const data = await res.json();
    return data.id; // Assuming the API returns the created post's ID
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
