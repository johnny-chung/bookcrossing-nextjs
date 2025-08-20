import Image from "next/image";
import FadingBGImg from "@/app/_components/features/home/FadingBGImg";
import { LangType } from "@/app/languages/_lang.types";
import { getLanguage } from "@/app/languages/_getLanguage";
import HomeCards from "@/app/_components/features/home/HomeCards";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: LangType }>;
}) {
  const { lang } = await params;
  const langPack = await getLanguage(lang);
  return (
    <div className="relative isolate bg-gray-100">
      <FadingBGImg />

      <section className="h-[120vh] flex flex-col mx-auto text-center items-center justify-center px-2 max-w-5xl md:px-4 lg:px-8">
        <h2 className="text-xl md:text-3xl lg:text-5xl font-bold text-center text-white my-10 -mt-6 lg:-mt-10">
          {langPack.goal}
        </h2>
        <p className="mt-4 my-10 text-pretty text-base md:text-xl md:font-medium text-gray-200">
          {langPack.goalDesc}
        </p>
      </section>

      <section className="relative z-10 pb-24  bg-gray-100">
        <div className="absolute top-0 left-0 w-full h-[20vh] bg-[#180b03] z-[-1]" />
        <HomeCards />
      </section>

      <section className="bg-gray-100 text-black w-full py-20 mb-10 px-2 md:px-4 lg:px-8">
        <div className="flex flex-col max-w-5xl mx-auto items-center justify-center text-center">
          Home
        </div>
        {/* <div className="mt-2 md:mt-6 flex items-center justify-center gap-x-6">
          <Link
            href="mailto:920software@gmail.com"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {HOME_CONTENT[lang].contact}
          </Link>
        </div> */}
      </section>
    </div>
  );
}
