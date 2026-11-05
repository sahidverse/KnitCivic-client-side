"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Checkbox } from "@heroui/react";
import {
  Heart,
  Mail,
  LockKeyhole,
  UserRound,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

type AuthPageProps = {
  mode: "login" | "register";
};

export default function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const isRegister = mode === "register";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (isRegister && !formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (isRegister && formData.photoURL.trim()) {
      try {
        const photoURL = new URL(formData.photoURL);
        if (photoURL.protocol !== "http:" && photoURL.protocol !== "https:") {
          throw new Error("Invalid photo URL protocol.");
        }
      } catch {
        newErrors.photoURL = "Please enter a valid image URL.";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (isRegister) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = "Password must contain an uppercase letter.";
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = "Password must contain a lowercase letter.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please check your information.", {
        description: Object.values(newErrors)[0],
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading || !validateForm()) return;

    try {
      setLoading(true);

      const { data, error } = isRegister
        ? await authClient.signUp.email({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            image: formData.photoURL.trim() || undefined,
            callbackURL: "/",
          })
        : await authClient.signIn.email({
            email: formData.email.trim(),
            password: formData.password,
            rememberMe,
            callbackURL: "/",
          });

      if (error) {
        toast.error(
          isRegister ? "Could not create your account." : "Could not log in.",
          {
            description: error.message,
          },
        );
        return;
      }

      if (!data) {
        throw new Error("Authentication did not return account data.");
      }

      toast.success(
        isRegister ? "Account created successfully!" : "Welcome back!",
        {
          description: isRegister
            ? "Your KnitCivic journey starts now."
            : "You have successfully logged in.",
        },
      );

      router.replace("/");
    } catch (error) {
      toast.error("Authentication failed.", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    if (socialLoading) return;

    try {
      setSocialLoading(true);
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error("GitHub sign-in failed.", {
          description: error.message,
        });
      }
    } catch (error) {
      toast.error("GitHub sign-in failed.", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-296 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
        {/* LEFT: Community introduction */}
        <section className="relative hidden min-h-196 flex-col overflow-hidden rounded-[28px] border border-border bg-card p-10 lg:flex">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Heart size={14} fill="none" />
            Together We Can
          </div>

          <h1 className="mt-5 text-[46px] font-bold leading-[1.12] tracking-[-2px]">
            Small Actions
            <br />
            Create <span className="text-primary">Big Change</span>
          </h1>

          <p className="mt-5 max-w-102.5 text-[15px] leading-6 text-muted-foreground">
            {isRegister
              ? "A little of your time can mean a lot to someone. Join kind people making a difference, one event at a time."
              : "Reconnect with your community and find your next opportunity to make a difference."}
          </p>

          {/* Community image */}
          <div className="relative mt-6 flex flex-1 items-center justify-center">
            {/* Decorative shapes */}
            <div className="absolute left-2 top-[30%] h-16 w-12 rotate-[-20deg] rounded-full bg-primary" />

            <div className="absolute right-[30%] top-[5%] h-10 w-20 rotate-30 rounded-full bg-[#0878d1]" />

            <div className="absolute bottom-[8%] right-[12%] h-16 w-20 rotate-[-25deg] rounded-full bg-[#7138b9]" />

            <div className="relative z-10 h-80 w-[90%] overflow-hidden rounded-[46%_54%_35%_40%]">
              <img
                src="/images/Volunteer.png"
                alt="Community volunteers standing together"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute right-2 top-[8%] z-20 max-w-31.25 rotate-[-8deg] font-serif text-lg font-bold italic leading-6">
              Better
              <br />
              Communities
              <br />
              Together
            </div>

            <Heart
              className="absolute right-5 top-[38%] z-20 text-primary"
              size={30}
            />

            <div className="absolute bottom-[12%] left-2 z-20 text-2xl text-[#0878d1]">
              ❧
            </div>
          </div>

          {/* Community statistics */}
          <div className="mt-2 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-bold text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-bold">
                10K+ kind people. One community.
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Better People. Stronger Communities.
              </p>
            </div>
          </div>

          <Separator className="my-5 bg-border" />

          <div className="flex gap-7 text-xs text-muted-foreground">
            <p>
              <strong className="text-foreground">120+</strong> events organized
            </p>
            <p>
              <strong className="text-foreground">20+</strong> communities
              helped
            </p>
          </div>
        </section>

        {/* RIGHT: Authentication form */}
        <section className="mx-auto w-full max-w-110 py-8">
          <div className="mb-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-primary">
              {isRegister
                ? "Your next chapter starts here"
                : "Good to have you here"}
            </p>

            <h2 className="text-[34px] font-bold tracking-tight">
              {isRegister ? "Join the community" : "Welcome back!"}
            </h2>

            <p className="mt-2 text-[15px] leading-6 text-muted-foreground">
              {isRegister
                ? "Create your free account and turn small acts of kindness into something bigger."
                : "Log in to discover meaningful events, connect with kind people, and keep doing good."}
            </p>
          </div>

          {/* GitHub button */}
          <Button
            type="button"
            variant="secondary"
            onPress={handleGithubLogin}
            isDisabled={socialLoading || loading}
            className="h-13 w-full rounded-xl border border-border bg-card text-foreground"
          >
            <span className="text-xl font-bold">
              <FaGithub />
            </span>
            <span>Continue with GitHub</span>
          </Button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <Separator className="flex-1 bg-border" />
            <span className="whitespace-nowrap text-xs text-muted-foreground">
              or {isRegister ? "register" : "log in"} with email
            </span>
            <Separator className="flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            {isRegister && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-foreground"
                >
                  Full name
                </label>
                <div
                  className={`flex h-13 items-center gap-3 rounded-xl border bg-card px-3 ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                >
                  <UserRound size={19} className="text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    name="name"
                    autoComplete="name"
                    required
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                    className="h-full flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-foreground"
              >
                Email address
              </label>
              <div
                className={`flex h-13 items-center gap-3 rounded-xl border bg-card px-3 ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
              >
                <Mail size={19} className="text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  name="email"
                  autoComplete="email"
                  required
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  className="h-full flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Photo URL */}
            {isRegister && (
              <div className="space-y-2">
                <label
                  htmlFor="photoURL"
                  className="text-sm font-semibold text-foreground"
                >
                  Photo URL
                </label>
                <div
                  className={`flex h-13 items-center gap-3 rounded-xl border bg-card px-3 ${
                    errors.photoURL ? "border-red-500" : "border-border"
                  }`}
                >
                  <UserRound size={19} className="text-muted-foreground" />
                  <Input
                    id="photoURL"
                    type="url"
                    value={formData.photoURL}
                    name="photoURL"
                    autoComplete="url"
                    onChange={(event) =>
                      updateField("photoURL", event.target.value)
                    }
                    placeholder="https://example.com/photo.jpg"
                    aria-invalid={!!errors.photoURL}
                    className="h-full flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                {errors.photoURL && (
                  <p className="text-xs text-red-400">{errors.photoURL}</p>
                )}
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-foreground"
              >
                Password
              </label>
              <div
                className={`flex h-13 items-center gap-3 rounded-xl border bg-card pr-3 ${
                  errors.password ? "border-red-500" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3 pl-3">
                  <LockKeyhole size={19} className="text-muted-foreground" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  name="password"
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                  required
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  placeholder={
                    isRegister ? "Create a password" : "Enter your password"
                  }
                  aria-invalid={!!errors.password}
                  className="h-full flex-1 border-0 bg-transparent pr-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Password requirements */}
            {isRegister && (
              <p className="text-xs text-muted-foreground">
                Use at least 6 characters, including one uppercase and one
                lowercase letter.
              </p>
            )}

            {/* Remember / Forgot password */}
            {!isRegister ? (
              <div className="flex items-center justify-between">
                <Checkbox
                  className="text-xs text-muted-foreground"
                  isSelected={rememberMe}
                  onChange={setRememberMe}
                >
                  Remember me
                </Checkbox>

                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-xs font-semibold text-primary hover:opacity-80 cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            ) : (
              <Checkbox
                isSelected={acceptedTerms}
                onChange={(isSelected) => {
                  setAcceptedTerms(isSelected);
                  setErrors((previous) => ({ ...previous, terms: "" }));
                }}
                className="flex flex-row text-xs text-muted-foreground"
              >
                I agree to the{" "}
                <span className="text-primary">Terms &amp; Conditions</span> and{" "}
                <span className="text-primary">Privacy Policy</span>.
              </Checkbox>
            )}
            {isRegister && errors.terms && (
              <p className="text-xs text-red-400">{errors.terms}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="secondary"
              isDisabled={loading || socialLoading}
              className="h-13.25 w-full rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-none hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-80"
            >
              <span className="flex items-center gap-2">
                {isRegister ? "Create account" : "Log in"}
                {!loading && <ArrowRight size={19} />}
              </span>
            </Button>
          </form>

          {/* Switch login/register */}
          <p className="mt-6 text-center text-[13px] text-muted-foreground">
            {isRegister
              ? "Already part of our community? "
              : "New to CommunityHub? "}

            <button
              type="button"
              onClick={() => router.push(isRegister ? "/login" : "/register")}
              className="font-semibold text-primary hover:opacity-80 cursor-pointer text-sm"
            >
              {isRegister ? "Log in" : "Create an account"}
            </button>
          </p>

          {/* Security note */}
          <div className="mt-7 flex items-center justify-center gap-2 text-center text-[11px] text-muted-foreground">
            <ShieldCheck size={16} />
            <span>Your kindness is powerful. Your details are safe.</span>
          </div>
        </section>
      </div>
    </main>
  );
}
