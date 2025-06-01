"use client";
import { useState } from "react";
import { Users } from "lucide-react";

export default function EventImage({ src, alt }: { src?: string; alt: string }) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-xl">
        <Users className="w-24 h-24 text-gray-400 mx-auto" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="object-cover w-full h-64 rounded-xl"
      onError={() => setImgError(true)}
    />
  );
}