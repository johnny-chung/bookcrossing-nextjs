import Link from "next/link";
import { LangType } from "@/app/languages/_lang.types";
import { getLanguage } from "@/app/languages/_getLanguage";

// Simple download page for the Android APK
// The actual APK lives at public/downloads/book_crossing.apk
// Optional: add translation keys to language JSON files for heading/description/button.
export default async function DownloadPage({
  params,
}: {
  params: Promise<{ lang: LangType }>;
}) {
  const { lang } = await params;
  const langPack = await getLanguage(lang); // currently not using new keys; placeholder text below

  return (
    <main className="min-h-[70vh] bg-gray-100 px-4 md:px-8 py-16 flex flex-col items-center justify-start">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
        Download Book Crossing App
      </h1>
      <p className="text-center text-gray-700 max-w-2xl mb-8">
        Get the latest Android APK for offline book sharing. If your device
        warns about installing from outside the Play Store, confirm only if you
        trust this source.
      </p>
      <div className="flex flex-col items-center gap-4">
        <a
          href="https://github.com/johnny-chung/book-crossing-flutter/releases/download/v1.0.0/app-release.apk"
          className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Download APK (v1.0.0)
        </a>
        <span className="text-xs text-gray-500">File: app-release.apk</span>
      </div>
      <div className="mt-10">
        <Link
          href={`/${lang}`}
          className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
