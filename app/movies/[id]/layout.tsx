import { Movie } from "@/types/Types";
import Image from "next/image";
import React, { ReactNode } from "react";

//https://api.themoviedb.org/3/movie/

async function getMovie(movieid: string) {
  const movie = await fetch(`https://api.themoviedb.org/3/movie/${movieid}`, {
    headers: {
      accept: "application/json",
      Authorization: process.env.APIURL as string,
    },
    next: {
      revalidate: 60,
    },
  });
  return movie.json();
}

export default async function MoviePage({
  params,
  children,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const data: Movie = await getMovie(params.id);
  return (
    <div className="min-h-screen p-4">
      <div className="h-[70vh] relative border border-gray-500">
        <Image
          src={`https://www.themoviedb.org/t/p/w500/${
            data.poster_path as string
          }`}
          fill
          alt={data.title as string}
        />
      </div>
      <div className="flex">
        <div className="flex-1">
          <h1 className="mt-4 text-2xl text-black font-medium">{data.title}</h1>
          <p className="mt-2">{data.overview}</p>
          <p className="mt-2">Release Date:{data.release_date}</p>
        </div>
        <div className="bg-gray-200 flex-1 mt-4">{children}</div>
      </div>
    </div>
  );
}
