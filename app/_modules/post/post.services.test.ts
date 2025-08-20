import {
  fetchPostById,
  fetchAllPosts,
  createPost,
} from "@/app/_modules/post/post.services";
import {
  mockPost,
  mockPosts,
  mockCreatePostDto,
} from "@/app/_modules/post/__mocks__/post.mocks";

// Mocking the global fetch function
global.fetch = jest.fn();

describe("PostService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPostById", () => {
    it("should fetch a post by ID", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPost,
      });

      const result = await fetchPostById("1");

      expect(fetch).toHaveBeenCalledWith("/api/posts/1");
      expect(result).toEqual(mockPost);
    });

    it("should throw an error if the fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(fetchPostById("1")).rejects.toThrow(
        "Failed to fetch post: Not Found"
      );
    });
  });

  describe("getPostList", () => {
    it("should fetch a list of posts", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPosts,
      });

      const result = await fetchAllPosts();

      expect(fetch).toHaveBeenCalledWith("/api/posts");
      expect(result).toEqual(mockPosts);
    });

    it("should throw an error if the fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Internal Server Error",
      });

      await expect(fetchAllPosts()).rejects.toThrow(
        "Failed to fetch posts: Internal Server Error"
      );
    });
  });

  describe("createPost", () => {
    it("should create a post and return its ID", async () => {
      const mockResponse = { id: "123" };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await createPost(mockCreatePostDto);

      expect(fetch).toHaveBeenCalledWith("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockCreatePostDto),
      });
      expect(result).toEqual("123");
    });

    it("should throw an error if the creation fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Bad Request",
      });

      await expect(createPost(mockCreatePostDto)).rejects.toThrow(
        "Failed to create post: Bad Request"
      );
    });
  });
});
