import { FilterOptsType } from "../FilterSideBar";

export const mockFilterOpts: FilterOptsType = [
  {
    category: "genre",
    options: [
      { label: "Fiction", value: "fiction" },
      { label: "Non-Fiction", value: "non-fiction" },
      { label: "Science Fiction", value: "sci-fi" },
    ],
  },
  {
    category: "language",
    options: [
      { label: "English", value: "english" },
      { label: "Spanish", value: "spanish" },
      { label: "French", value: "french" },
    ],
  },
  {
    category: "availability",
    options: [
      { label: "Available", value: "available" },
      { label: "Checked Out", value: "checked-out" },
    ],
  },
];
