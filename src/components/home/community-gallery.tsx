"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const galleryImages = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSABnbrkynapq7zYfqEJqEx5XaFk2qPuH0XfIFlc73Q8A&s=10",
    alt: "Volunteers planting together in a park",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY8Db6u0gFlXRMP3rVbArfMZZoUZTtw4ZU2rnDJDMKSw&s=10",
    alt: "Hands holding a plant seedling",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9AKD2HMgVIqwhRQibDKzOzytLcK5TgvfI2ZP1o_mtbQ&s=10",
    alt: "Group of volunteers putting hands together",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy-o4EH6D4TSrdZnQX-5wI4gSFp2OCPfKtdTAo9Z_WsA&s=10",
    alt: "Students raising hands in a classroom",
  },
];

export function CommunityGallery() {
  return (
    <section className="relative">
      <span
        aria-hidden
        className="font-script pointer-events-none absolute right-10 top-4 hidden size-auto rotate-10 text-xl text-muted-foreground/70 lg:block"
      >
        Moments that matter!
      </span>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Community Gallery
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Moments that<span className="text-pink-500"> inspire</span>. People
            who care.
          </p>
          <Button className="group mt-6 rounded-full px-5 py-5 shadow-lg shadow-primary/30">
            View Gallery
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className="group relative overflow-hidden rounded-2xl border border-border"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={360}
                height={440}
                className={
                  index % 2 === 0
                    ? "aspect-4/5 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    : "aspect-4/5 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:mt-6"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
