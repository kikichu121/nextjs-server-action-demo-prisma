/* eslint-disable jsx-a11y/alt-text */
import { Trending } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const data = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization: process.env.APIURL as string,
      },
    }
  );

  return data.json();
}

export default async function Home() {
  const data: Trending = await getData();
  console.log(data);

  return (
    <main className="bg-slate-600 w-full h-screen">
      <div className="items-center justify-center flex pt-10">
        <h1 className=" text-3xl font-medium text-teal-300">Top Trending</h1>
      </div>
      <div className="grid grid-cols-4 gap-5 items-center ">
        {data.results.map((movie) => (
          <div
            key={movie.id}
            className="p-3 bg-gray-200 flex
             w-72 place-content-center"
          >
            <div className="flex-col place-content-center">
              <Image
                src={`https://www.themoviedb.org/t/p/w500/${
                  movie.poster_path as string
                }`}
                alt={movie.title as string}
                height={400}
                width={200}
              />
              <Link
                href={`/movies/${movie.id}`}
                className="transition duration-700 text-black hover:text-teal-500"
              >
                <h1 className="font-bold mt-3 mb-3 text-ellipsis">
                  {movie.title}
                </h1>
              </Link>

              <p className="text-sm text-gray-400 text-ellipsis line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
