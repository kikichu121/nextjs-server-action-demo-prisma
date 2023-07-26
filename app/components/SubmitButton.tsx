"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

import React from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-teal-400 px-4 py-3 rounded-lg text-white mt-2"
    >
      {pending ? <>loading...</> : <>Add Comment</>}
    </button>
  );
}

export default SubmitButton;
