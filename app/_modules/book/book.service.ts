import "server-only";
import { LanguagesDto } from "./book.dto";
import { BACKEND_URL } from "@/app/_lib/constant/backend";

export async function getBookLanguages(): Promise<string[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/books/languages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch languages");
    }

    const resJson: LanguagesDto = await response.json();
    const languages = resJson.map((lang) => lang.language);
    return languages;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function getBookCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/books/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const resJson: { id: string; category: string; count: number }[] =
      await response.json();
    const categories = resJson.map((cat) => cat.category);
    return categories;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
