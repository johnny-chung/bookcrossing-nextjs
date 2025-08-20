export type GoogleBookVolume = {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    pageCount?: number;
    mainCategory: string;
    imageLinks?: {
      thumbnail?: string;
      medium?: string;
      large?: string;
    };
    language?: string;
  };
};

export type GoogleBookSearchResponse = {
  kind: string;
  totalItems: number;
  items?: GoogleBookVolume[];
};
