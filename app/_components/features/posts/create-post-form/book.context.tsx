"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { GoogleBookVolume } from "@/app/_services/google/google.dto";

interface BookContextProps {
  book: GoogleBookVolume | null;
  setBook: (book: GoogleBookVolume | null) => void;
}

const SelectedBookContext = createContext<BookContextProps | undefined>(
  undefined
);

export const SelectedBookProvider = ({ children }: { children: ReactNode }) => {
  const [book, setBook] = useState<GoogleBookVolume | null>(null);

  return (
    <SelectedBookContext.Provider value={{ book, setBook }}>
      {children}
    </SelectedBookContext.Provider>
  );
};

export const useSelectedBook = (): BookContextProps => {
  const context = useContext(SelectedBookContext);
  if (!context) {
    throw new Error(
      "useSelectedBook must be used within a SelectedBookProvider"
    );
  }
  return context;
};
