import { db } from "@/app/db";
import { revalidatePath } from "next/cache";
import React from "react";

export const dynamic = "force-dynamic";

async function getData(id: string) {
  const data = await db.comment.findMany({
    where: {
      movieId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

async function postData(formdata: FormData) {
  "use server";

  const data = await db.comment.create({
    data: {
      message: formdata.get("comment") as string,
      movieId: formdata.get("id") as string,
    },
  });

  revalidatePath("/movies/[id]");
}

type MovieidProps = {
  params: {
    id: string;
  };
};

export default async function MoviesCmt({ params: { id } }: MovieidProps) {
  const data = await getData(id);

  return (
    <div className="rounded-lg border p-3">
      <h1 className="text-xl font-semibold mb-5">Your Commnets</h1>

      <div>
        <form action={postData}>
          <textarea
            name="comment"
            className="w-full border-teal-200 rounded-lg p-2"
          ></textarea>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="bg-teal-400 px-4 py-3 rounded-lg text-white mt-2"
          >
            Add Comment{" "}
          </button>
        </form>

        <div className="mt-5 flex flex-col gap-y-3">
          {data.map((post) => (
            <p key={post.id}>{post.message}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
