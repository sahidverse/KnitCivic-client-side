import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats-bar";
import { FeaturedEvents } from "@/components/home/featured-events";
import { EventCategories } from "@/components/home/event-categories";
import { HowItWorks } from "@/components/home/how-it-works";
import { CommunityGallery } from "@/components/home/community-gallery";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";
import { FooterMain } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-svh">
      <Hero />
      <Stats />
      <HowItWorks />

      <FeaturedEvents />
      <EventCategories />

      {/* Inset band containing gallery, testimonials + newsletter */}
      <section className="mx-auto w-full max-w-6xl px-3 pb-16 sm:px-5">
        <div className="rounded-[2.5rem] bg-surface/60 py-2">
          <CommunityGallery />
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
            <Testimonials />
            <Newsletter />
          </div>
        </div>
      </section>
      <FooterMain />
    </div>
  );
}
