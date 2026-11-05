"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Heart,
  MapPin,
  CalendarDays,
  Bookmark,
  Users,
  CalendarPlus,
  Edit3,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  X,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ProfileSkeleton from "@/components/loader/ProfileSkeleton";

type Profile = {
  name: string;
  email: string;
  image?: string;
  photoURL?: string;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
};

export default function ProfilePage() {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  const [customProfile, setCustomProfile] = useState<Partial<Profile>>({});

  const profile: Profile = {
    name: customProfile.name ?? user?.name ?? "Community Member",
    email: customProfile.email ?? user?.email ?? "",
    image:
      customProfile.image ?? user?.image ?? "https://i.pravatar.cc/150?img=12",
    photoURL:
      customProfile.photoURL ??
      user?.image ??
      "https://i.pravatar.cc/150?img=12",
    phone: customProfile.phone ?? "",
    location: customProfile.location ?? "",
    website: customProfile.website ?? "",
    bio: customProfile.bio ?? "",
  };

  const [editData, setEditData] = useState<Profile>(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setEditData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!editData.name.trim() || !editData.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }

    if (editData.image && !/^https?:\/\/.+/i.test(editData.image)) {
      toast.error("Please enter a valid image URL.");
      return;
    }

    setCustomProfile(editData);
    setIsEditing(false);

    toast.success("Profile updated successfully!", {
      description: "Your profile information has been saved.",
    });
  };

  const updateField = (field: keyof Profile, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isPending) {
    return <ProfileSkeleton />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-9 sm:px-6 lg:py-12">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-primary">
            ACCOUNT / PROFILE
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your personal information and track your community impact.
          </p>
        </div>

        {/* Profile hero card */}

        {/* TWO COLUMN PROFILE LAYOUT */}
        <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          {/* LEFT: MY ACCOUNT / PROFILE */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card lg:col-span-2">
            {/* Profile banner */}
            <div className="relative h-32 bg-linear-to-r from-primary/20 via-primary/10 to-card">
              <div className="absolute -right-10 -top-20 h-48 w-48 rounded-full bg-[#ff397e]/15 blur-3xl" />

              <div>
                <div className="absolute left-6 top-5">
                  <p className="sm:text-xs text-[10px] font-semibold uppercase tracking-[2px] text-primary">
                    MY ACCOUNT / PROFILE
                  </p>
                  <h2 className="mt-2 sm:text-xl text-lg font-bold">
                    Personal Information
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90 absolute right-6 top-5 text-sm cursor-pointer"
                >
                  <Edit3 size={16} />
                  <span className="hidden md:block">Edit Profile</span>
                </button>
              </div>
            </div>

            <div className="px-6 pb-7">
              {/* Profile avatar and edit button */}
              <div className="-mt-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div className="relative">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="h-24 w-24 rounded-full border-4 border-card bg-muted object-cover text-2xl"
                  />
                  <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#191d36] bg-[#7bdcb5]" />
                </div>
              </div>

              {/* Name */}
              <div className="mt-5 border-b border-border pb-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-bold">{profile.name}</h3>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    <ShieldCheck size={13} />
                    Active Member
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {profile.email}
                </p>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {profile.bio
                    ? profile.bio
                    : "No bio provided. Add a short description about yourself."}
                </p>
              </div>

              {/* Personal details */}
              {/* <div className="mt-6">
                <h3 className="mb-5 text-base font-bold">Personal Details</h3>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <InfoItem
                    icon={<Mail size={18} />}
                    label="Email Address"
                    value={profile.email}
                  />

                  <InfoItem
                    icon={<Phone size={18} />}
                    label="Phone Number"
                    value={profile.phone || "Not provided"}
                  />

                  <InfoItem
                    icon={<MapPin size={18} />}
                    label="Location"
                    value={profile.location || "Not provided"}
                  />

                  <InfoItem
                    icon={<Globe size={18} />}
                    label="Website"
                    value={profile.website || "Not provided"}
                  />

                  <InfoItem
                    icon={<CalendarDays size={18} />}
                    label="Member Since"
                    value="October 2026"
                  />

                  <InfoItem
                    icon={<ShieldCheck size={18} />}
                    label="Account Status"
                    value="Active"
                  />
                </div>
              </div> */}

              {/* Profile completion */}
              {/* <div className="mt-7 rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Your community profile
                  </p>
                  <span className="text-xs font-bold text-primary">85%</span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[85%] rounded-full bg-primary" />
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  Complete your profile to help others get to know you.
                </p>
              </div> */}
            </div>
          </div>

          {/* RIGHT: YOUR ACTIVITY */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-3">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[2px] text-primary">
                COMMUNITY CONTRIBUTION
              </p>

              <h2 className="mt-2 text-xl font-bold">Your Activity</h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Track your events and see how you contribute to your community.
              </p>
            </div>

            <div className="space-y-4   gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* Saved events */}
              <div className="group rounded-2xl border border-border bg-background p-5 transition hover:border-primary/60">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff397e]/10">
                    <Bookmark size={23} className="text-[#ff397e]" />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-muted-foreground group-hover:text-primary"
                  />
                </div>

                <h3 className="mt-5 text-3xl font-bold">12</h3>

                <p className="mt-1 text-sm font-semibold">Saved Events</p>

                <p className="mt-2 text-xs text-muted-foreground">
                  Events you bookmarked for later.
                </p>
              </div>

              {/* Joined events */}
              <div className="group rounded-2xl border border-border bg-background p-5 transition hover:border-sky-500/60">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0693e3]/10">
                    <Users size={23} className="text-[#0693e3]" />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-muted-foreground group-hover:text-sky-500"
                  />
                </div>

                <h3 className="mt-5 text-3xl font-bold">08</h3>

                <p className="mt-1 text-sm font-semibold">Joined Events</p>

                <p className="mt-2 text-xs text-muted-foreground">
                  Events you registered to participate in.
                </p>
              </div>

              {/* Created events */}
              <div className="group rounded-2xl border border-border bg-background p-5 transition hover:border-purple-500/60">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#9b51e0]/10">
                    <CalendarPlus size={23} className="text-[#9b51e0]" />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-muted-foreground group-hover:text-purple-500"
                  />
                </div>

                <h3 className="mt-5 text-3xl font-bold">05</h3>

                <p className="mt-1 text-sm font-semibold">Created Events</p>

                <p className="mt-2 text-xs text-muted-foreground">
                  Events you organized for others.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:p-8">
          <div>
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-primary" />
              <h2 className="text-lg font-bold">Ready to make a difference?</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover new events and become part of something meaningful.
            </p>
          </div>

          <Link
            href="/events/upcomingevents"
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground text-sm justify-center"
          >
            <ArrowUpRight size={18} />
            Explore Events
          </Link>
        </section>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-140 rounded-2xl border border-border bg-card p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Edit Profile</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Update your personal information.
                </p>
              </div>

              <button
                onClick={handleCancel}
                className="rounded-lg bg-muted p-2 text-slate-100"
                aria-label="Close edit profile"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <img
                src={editData.photoURL || "https://i.pravatar.cc/150?img=12"}
                alt={editData.name}
                className="h-20 w-20 rounded-full border-2 border-primary object-cover"
              />
              <div>
                <p className="text-sm font-semibold">Profile picture</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Add your image URL below.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <EditInput
                label="Full name"
                value={editData.name}
                onChange={(v) => updateField("name", v)}
                placeholder="Enter your name"
              />

              <EditInput
                label="Email address"
                value={editData.email}
                onChange={(v) => updateField("email", v)}
                placeholder="Enter your email"
                type="email"
              />

              <div className="grid grid-cols-2 gap-2">
                <EditInput
                  label="Photo URL"
                  value={editData.photoURL ?? ""}
                  onChange={(v) => updateField("photoURL", v)}
                  placeholder="https://example.com/photo.jpg"
                />

                <EditInput
                  label="Phone number"
                  value={editData.phone ?? ""}
                  onChange={(v) => updateField("phone", v)}
                  placeholder="Enter phone number"
                />

                <EditInput
                  label="Location"
                  value={editData.location ?? ""}
                  onChange={(v) => updateField("location", v)}
                  placeholder="Your location"
                />

                <EditInput
                  label="Website"
                  value={editData.website ?? ""}
                  onChange={(v) => updateField("website", v)}
                  placeholder="Your website URL"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  About me
                </label>
                <textarea
                  value={editData.bio ?? ""}
                  onChange={(event) => updateField("bio", event.target.value)}
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="w-full resize-y rounded-xl border border-border bg-background p-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="h-10 text-sm rounded-xl border border-border px-4 text-foreground hover:bg-muted"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-6 text-sm justify-center font-semibold text-primary-foreground"
              >
                <Check size={17} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Reusable information item
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

// Reusable edit input
function EditInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-border bg-background px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
      />
    </label>
  );
}
