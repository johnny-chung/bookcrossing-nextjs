import "server-only";
import { LangType } from "@/app/languages/_lang.types";

const languages = {
  en: () => import("@/app/languages/en.json").then((module) => module.default),
  tc: () => import("@/app/languages/tc.json").then((module) => module.default),
};

export const getLanguage = async (locale: LangType) => languages[locale]();
