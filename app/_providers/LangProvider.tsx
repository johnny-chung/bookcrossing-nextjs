"use client";

import { LangType } from "@/app/languages/_lang.types";
import { createContext, useContext } from "react";

type LangContextType = {
  lang: string;
  langPack: any;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LanguageProvider({
  lang,
  langPack,
  children,
}: {
  lang: LangType;
  langPack: any;
  children: React.ReactNode;
}) {
  return (
    <LangContext.Provider value={{ lang, langPack }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
}
