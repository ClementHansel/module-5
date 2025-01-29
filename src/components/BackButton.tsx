"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mt-6"
    >
      ← Back
    </button>
  );
}
