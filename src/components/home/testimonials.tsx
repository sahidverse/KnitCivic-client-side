"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: "kamrul",
    quote:
      "This platform helped me find meaningful volunteer opportunities in my area. It's easy to join events and people come together for a better tomorrow.",
    name: "Kamrul Islam",
    role: "Volunteer",
    avatarUrl: "/avatars/v3.jpg",
  },
  {
    id: "ismotara",
    quote:
      "Joining KnitCivic was the best decision of my year. Every event feels personal, organized and truly makes a difference in our community.",
    name: "Ismotara Dipty",
    role: "Community Lead",
    avatarUrl: "/avatars/v4.jpg",
  },
];

export function Testimonials() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        What People Say
      </h2>

      <p className="-mt-4 text-sm text-muted-foreground">
        Real stories.
        <span className="text-pink-500"> Real impact.</span>
      </p>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative w-full"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <div className="relative rounded-3xl border border-border bg-card p-6">
                <Quote
                  aria-hidden
                  className="absolute -top-2 left-6 size-8 text-primary"
                  fill="currentColor"
                />

                <p className="text-sm leading-6 text-foreground/90">
                  {testimonial.quote}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        {testimonial.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <CarouselPrevious className="static size-8 translate-y-0 rounded-full border border-border" />

                    <CarouselNext className="static size-8 translate-y-0 rounded-full border border-border" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
