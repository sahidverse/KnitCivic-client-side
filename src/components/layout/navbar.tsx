"use client";

import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { authClient } from "@/lib/auth-client";
import { UserProfile } from "../loader/UserSkeleton";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="relative flex size-9 items-center justify-center">
        <Image
          src="/logoL.svg"
          fill
          alt="KnitCivic"
          className="object-contain dark:hidden"
        />
        <Image
          src="/logoD.svg"
          fill
          alt="KnitCivic"
          className="hidden object-contain dark:block"
        />
      </span>

      <span className="font-heading text-lg font-semibold tracking-tight">
        <span>
          Knit<span className="text-primary">Civic</span>
        </span>
        <span className="block text-xs">
          Weaving communities, sparking change.
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const router = useRouter();

  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block cursor-pointer">
          <Link
            href="/events/upcomingevents"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground px-2.5 py-1.5"
          >
            Upcoming Events
          </Link>
        </nav>

        <div className="relative flex items-center gap-3">
          <ThemeToggle />

          {isPending ? (
            <UserProfile />
          ) : user ? (
            <>
              <UserMenu user={user} />

              <button
                type="button"
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
              >
                <LogOut className="size-4" />
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex gap-2 items-center rounded-full bg-primary px-5 py-2 text-primary-foreground cursor-pointer hover:bg-primary/90"
            >
              <LogIn className="size-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
