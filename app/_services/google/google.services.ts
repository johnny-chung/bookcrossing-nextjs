import "server-only";
import {
  GoogleBookSearchResponse,
  GoogleBookVolume,
} from "@/app/_services/google/google.dto";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function getGoogleBooks(
  query: string
): Promise<GoogleBookSearchResponse> {
  const isISBN = /^[0-9]{9}[0-9Xx]$|^[0-9]{13}$/.test(query); // Check if query is a 10-digit number (last digit can be 0-9 or X/x) or a 13-digit number
  const queryParam = isISBN ? `isbn:${query}` : encodeURIComponent(query);

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${queryParam}&maxResults=10&key=${GOOGLE_API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Google Books");
  }

  const data = await response.json();
  return data;
}

export async function getGoogleBook(id: string): Promise<GoogleBookVolume> {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}?key=${GOOGLE_API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Google Book");
  }

  const data = await response.json();
  return data;
}
