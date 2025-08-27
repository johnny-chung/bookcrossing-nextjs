"use client";
import SearchInput from "@/app/_components/common/SearchInput";
import { cn } from "@/app/_lib/utils/shadcn";
import {
  GoogleBookSearchResponse,
  GoogleBookVolume,
} from "@/app/_services/google/google.dto";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import Image from "next/image";
import { useSelectedBook } from "@/app/_components/features/posts/create-post-form/book.context";

export default function SelectBook({
  googleBooks,
  className,
  ...props
}: {
  googleBooks: GoogleBookSearchResponse;
} & React.ComponentProps<"div">) {
  const { book, setBook } = useSelectedBook();

  function handleBookSelect(book: GoogleBookVolume) {
    setBook(book);
  }

  const isSelected = (selectedBook: GoogleBookVolume) => {
    return book?.id === selectedBook.id;
  };

  return (
    <div
      className={cn("flex flex-col items-center mt-4", className)}
      {...props}
    >
      <SearchInput />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2 lg:p-4">
        {googleBooks.items?.length &&
          googleBooks.items.map((book, idx) => (
            <Card
              key={idx}
              onClick={() => handleBookSelect(book)}
              className={cn(
                "cursor-pointer hover:shadow-lg hover:bg-accent/35 transition-shadow duration-200",
                isSelected(book) && "bg-accent shadow-lg border-2"
              )}
            >
              <CardContent className="px-2 xl:px-4">
                <div className="relative w-40 md:w-30 lg:w-36 aspect-3/4 mx-auto mt-2">
                  <Image
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      "/public/default-book-thumbnail.png"
                    }
                    alt={book.volumeInfo.title || "No title available"}
                    fill
                    className="object-fit rounded-md"
                  />
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle>{book.volumeInfo.title}</CardTitle>
                <CardDescription>
                  {book.volumeInfo.authors
                    ? book.volumeInfo.authors.join(", ").length > 50
                      ? book.volumeInfo.authors.join(", ").slice(0, 50) + "..."
                      : book.volumeInfo.authors.join(", ")
                    : "N/A"}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
}
