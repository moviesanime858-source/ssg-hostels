"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryImages =
    images.length > 0
      ? images
      : ["https://images.unsplash.com/photo-1555854877-0b037c5d5566?w=800&q=80"];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={galleryImages[activeIndex]}
          alt={`${alt} - image ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
          priority
        />
      </div>

      {galleryImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {galleryImages.map((img, index) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                activeIndex === index
                  ? "border-teal-600 ring-2 ring-teal-200"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
