"use client";

import { MailPlus, Send } from "lucide-react";
import { Input } from "@heroui/react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-primary/10 blur-2xl"
      />
      <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15">
        <MailPlus className="size-7 text-primary" />
      </span>

      <h2 className="mt-5 text-xl font-bold tracking-tight">
        Subscribe to Our Newsletter
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Get updated on our latest initiatives, events, and opportunities to make
        a difference.
      </p>

      <form
        className="mt-6 flex items-center flex-wrap gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          // Hook up to your API later.
        }}
      >
        {/* HeroUI input */}
        <Input
          type="email"
          required
          placeholder="Your email address"
          aria-label="Your email address"
          className="max-w-64 rounded-full"
        />
        <Button
          type="submit"
          className="rounded-full px-5 shadow-lg shadow-primary/30"
        >
          Subscribe
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}
