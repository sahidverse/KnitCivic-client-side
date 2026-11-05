"use client";

import { Heart, HeartIcon, HeartXIcon, MailPlus, Send } from "lucide-react";
import { Input } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/navbar";
import Link from "next/link";

const quickLinks = ["Home", "Upcoming Events", "Past Events", "About Us"];
const supportLinks = [
  "Help Center",
  "Privacy Policy",
  "Terms & Conditions",
  "Contact",
];

/* lucide-react v1.x has no brand icons; use tiny inline SVGs. */
const socials: { id: string; label: string; path: string; link: string }[] = [
  {
    id: "facebook",
    label: "Facebook",
    path: "M13.5 9H15V6.5h-1.5c-1.933 0-3.5 1.567-3.5 3.5v1.5H8V14h2v6h2.5v-6h2l.5-2.5h-2.5V10c0-.552.448-1 1-1Z",
    link: "https://www.facebook.com/kamrulliislam",
  },
  {
    id: "instagram",
    label: "Instagram",
    path: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 1.75a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM16 7.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM12 6c2.4 0 2.7.01 3.5.058a4 4 0 0 1 1.376.253 3.2 3.2 0 0 1 1 .62c.29.29.47.6.62 1a4 4 0 0 1 .253 1.376C18.9 10.07 18.91 10.37 18.91 12s-.01 1.93-.058 3.5a4 4 0 0 1-.253 1.376c-.15.4-.33.71-.62 1a3.2 3.2 0 0 1-1 .62 4 4 0 0 1-1.376.253c-.77.048-1.1.058-3.5.058s-2.73-.01-3.5-.058a4 4 0 0 1-1.376-.253 3.2 3.2 0 0 1-1-.62c-.29-.29-.47-.71-.62-1a4 4 0 0 1-.253-1.376C5.1 13.93 5.09 13.63 5.09 12s.01-1.93.058-3.5a4 4 0 0 1 .253-1.376c.15-.4.33-.71.62-1a3.2 3.2 0 0 1 1-.62A4 4 0 0 1 8.4 6.058C9.27 6.01 9.6 6 12 6Z",
    link: "https://www.instagram.com/kamrulliislam",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    path: "M8.5 10.5V17H6v-6.5h2.5Zm.25-2.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm3.25 2.75v.75c.4-.55 1.1-.95 2-.95 1.9 0 3 1.15 3 3.2V17h-2.5v-3.2c0-.9-.4-1.4-1.1-1.4-.8 0-1.4.55-1.4 1.55V17H12.5Z",
    link: "https://www.linkedin.com/in/kamruliislam",
  },
  {
    id: "twitter",
    label: "X",
    path: "M6.5 7l4.3 5.6L6.8 17.5h2l3.1-3.5 2.8 3.5h3.6l-4.5-5.9 3.7-4.6h-2l-2.8 3.2L10.1 7H6.5Z",
    link: "https://x.com/kamrul_iislam",
  },
  {
    id: "github",
    label: "GitHub",
    path: "M8.5 10.5V17H6v-6.5h2.5Zm.25-2.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm3.25 2.75v.75c.4-.55 1.1-.95 2-.95 1.9 0 3 1.15 3 3.2V17h-2.5v-3.2c0-.9-.4-1.4-1.1-1.4-.8 0-1.4.55-1.4 1.55V17H12.5Z",
    link: "https://github.com/kamrulcode",
  },
];

export function FooterMain() {
  return (
    <footer className=" border border-b-0 border-border bg-card">
      <div className="mx-auto w-full max-w-6xl grid gap-10 rounded-t-3xl px-6 py-12 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <div className="ml-12">
            <p className="mt-4 max-w-56 text-xs leading-5 text-muted-foreground">
              Better People. Stronger Communities.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between md:justify-around md:col-span-2 md:col-start-2">
          <nav aria-label="Quick links">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Stay Connected</h3>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Subscribe to our newsletter for upcoming events and updates.
          </p>
          <form
            className="mt-4 flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Input
              type="email"
              required
              placeholder="Your email address"
              aria-label="Your email address"
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Subscribe"
              className="rounded-full shadow-lg shadow-primary/30"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export const FooterSecondary = () => {
  return (
    <footer className=" border-t border-border bg-card">
      <div className="mx-auto w-full max-w-6xl flex flex-col items-center justify-between gap-2   px-6 py-4 text-xs text-muted-foreground sm:flex-row sm:px-10">
        <p>© 2026 KnitCivic. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="size-3 text-primary" />
          <Link href="https://github.com/kamrulcode">by Kamrul Islam</Link>
        </p>
      </div>
    </footer>
  );
};
