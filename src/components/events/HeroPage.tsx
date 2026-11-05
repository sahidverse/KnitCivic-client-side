import { Heart } from "lucide-react";

type PageHeroProps = {
  title: string;
  highlight?: string;
  description: string;
  badge?: string;
  image?: string;
  className?: string;
};

export default function HeroPage({
  title,
  highlight,
  description,
  badge = "Together We Can",
  image = "/images/Volunteer.png",
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative mt-3 w-full overflow-hidden rounded-[2rem]  ${className}`}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-primary/15 blur-[110px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Heart className="size-3.5" fill="currentColor" />
            {badge}
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}{" "}
            {highlight && <span className="text-primary">{highlight}</span>}
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {description}
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mx-auto w-full max-w-md">
          {/* Decorative shapes */}
          <div
            aria-hidden="true"
            className="absolute -left-5 top-1/2 size-20 -translate-y-1/2 rounded-full bg-primary"
          />

          <div
            aria-hidden="true"
            className="absolute -right-3 top-8 h-28 w-9 rounded-full bg-primary"
          />

          {/* Decorative SVG */}
          <div
            aria-hidden="true"
            className="absolute -left-3 bottom-8 z-10 h-5 w-8 text-sky-400"
          >
            <svg viewBox="0 0 24 12" fill="none" className="size-full">
              <path
                d="M1 9 5 3l4 6 4-6 4 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Handwritten text */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 top-2 hidden rotate-10 text-center font-script text-xl leading-tight text-foreground lg:block"
          >
            Be a Part
            <br />
            of the
            <br />
            Change!
          </span>

          {/* Blob image */}
          <div className="w-full">
            <svg
              viewBox="0 0 243 184"
              className="h-auto w-full z-30"
              role="img"
              aria-label="Community volunteers"
            >
              <defs>
                <clipPath id="customBlob" clipPathUnits="userSpaceOnUse">
                  <path d="M 25.5,24 Q 17,33 12.5,45 Q 8,57 6,66 Q 4,75 2,91 Q 0,107 0,118.5 Q 0,130 1,138 Q 2,146 5,155.5 Q 8,165 14.5,172 Q 21,179 31.5,180.5 Q 42,182 61,182 Q 80,182 110,175.5 Q 140,169 156.5,171 Q 173,173 185,172.5 Q 197,172 202,170.5 Q 207,169 214.5,164.5 Q 222,160 226.5,155 Q 231,150 234.5,143.5 Q 238,137 240,129.5 Q 242,122 242,116 Q 242,110 238.5,100.5 Q 235,91 221.5,77.5 Q 208,64 202.5,55 Q 197,46 189.5,41 Q 182,36 173,34.5 Q 164,33 144.5,21.5 Q 125,10 109,5 Q 93,0 84.5,0 Q 76,0 62,3 Q 48,6 41,10.5 Q 34,15 25.5,24 Z" />
                </clipPath>
              </defs>

              <image
                href={image}
                width="243"
                height="184"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#customBlob)"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
