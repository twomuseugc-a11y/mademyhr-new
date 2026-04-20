"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";

export default function AboutPage() {
  const storyParagraphs = [
    "We started with a simple thought — why should everyone wear the same designs?",
    "In a world of mass production, most clothing feels repeated, predictable, and impersonal. We wanted to change that.",
    "We’re two engineering students who decided to build something different — combining technology and creativity to design clothing that feels personal, rare, and meaningful.",
    "At madebyhr, every piece is created after you order it. Not mass-produced. Not stocked in bulk.",
    "This means what you wear isn’t just another design — it’s something made specifically for you.",
    "We use AI as a tool to explore unique ideas, but every design is carefully refined and chosen by us before it becomes a real product.",
    "No extra inventory. No unnecessary production. Just intentional design.",
    "We know trusting a new brand takes a leap. That’s why we focus on being clear, honest, and consistent — from design to delivery.",
    "When you choose madebyhr, you’re not just buying clothing. You’re choosing to stand out — with something that not everyone else has.",
    "Because what you wear should feel like yours.",
    "— Team madebyhr",
  ];

  const valuePillars = [
    ["🧵", "Made to Order", "Crafted only after you place your order."],
    ["✨", "Limited Pieces", "Every design exists in small, exclusive quantities."],
    ["🌿", "Thoughtful Design", "Comfort, longevity, and elegance combined."],
  ];

  const policyItems = [
    ["🧵 Made-to-Order", "Production begins immediately after your order is confirmed."],
    ["✨ Limited Edition", "Each design is produced in limited quantities and not restocked."],
    ["💳 Prepaid Only", "All orders must be prepaid. COD is not available."],
    ["📏 Size Selection", "Check size chart carefully. Changes allowed only before shipping."],
    ["❌ No Cancellation", "Orders cannot be cancelled once confirmed."],
    ["🚚 Delivery", "Estimated delivery within 15 working days."],
    ["♻️ Returns", "Accepted within 2–3 days if unused with tags."],
    ["💰 Refunds", "Processed after inspection for defects or issues."],
  ];

  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_8%_6%,#f8f1e7_0%,#f4ecdf_35%,#efe6d8_100%)] text-[#2d2d2d]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(255,255,255,0.48),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute left-[-180px] top-[280px] h-72 w-72 rounded-full bg-[#d8c1a7]/22" />
      <div className="pointer-events-none absolute bottom-[180px] right-[-180px] h-80 w-80 rounded-full bg-[#d9c9b4]/26" />

      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center justify-center text-center px-6 py-20">

        <div className="absolute w-[500px] h-[500px] bg-[#e8dfd3] rounded-full opacity-34 top-[-120px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-[#e0d6c8] rounded-full opacity-32 bottom-[-120px] right-[-120px]" />

        <div className="relative z-10 max-w-4xl rounded-[32px] border border-[#d9c9b4]/60 bg-white/55 px-6 py-12 shadow-[0_18px_50px_rgba(33,24,16,0.08)] backdrop-blur-sm md:px-12 md:py-14">

          <FadeIn>
            <p className="mx-auto inline-flex items-center rounded-full border border-[#d5c2ac] bg-white/80 px-4 py-1 text-[10px] uppercase tracking-[0.24em] text-[#6b5845]">
              The Brand Story
            </p>
          </FadeIn>

          <FadeIn>
            <h1 className="mt-5 text-4xl md:text-6xl font-light leading-tight tracking-[-0.03em] text-[#1f1710]">
              About <span className="italic text-[#b07f51]">madebyhr</span>
            </h1>
          </FadeIn>

          <FadeIn>
            <div className="mx-auto my-6 h-[1px] w-16 bg-[#b08968]" />
          </FadeIn>

          <FadeIn>
            <p className="mx-auto max-w-xl text-sm md:text-base leading-relaxed text-[#5f5246]">
              Not just clothing — a slower, more personal way of dressing.
              Every piece is created with intention, made only for you.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="mt-6 text-xs tracking-widest text-gray-400 uppercase">
              Made slowly · Worn proudly
            </p>
          </FadeIn>

          <FadeIn>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#6d5a46]">
              <span className="rounded-full border border-[#d8c8b6] bg-white/75 px-3 py-1">Made to Order</span>
              <span className="rounded-full border border-[#d8c8b6] bg-white/75 px-3 py-1">Small Batch Feel</span>
              <span className="rounded-full border border-[#d8c8b6] bg-white/75 px-3 py-1">Designed by Founders</span>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* STORY */}
      <section className="px-6 md:px-16 py-20 md:py-24">
        <div className="grid items-start gap-12 md:grid-cols-2">

          {/* IMAGE */}
          <FadeIn>
            <div className="flex justify-center">
              <div className="relative h-[260px] w-[260px] overflow-hidden rounded-[30px] border border-[#dccbb5] bg-[#f8f1e8] shadow-[0_18px_42px_rgba(20,15,10,0.1)] md:h-[340px] md:w-[340px]">

                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.05)_100%)]" />

                <Image
                  src="/story.jpg"
                  alt="founders"
                  fill
                  sizes="(max-width: 768px) 260px, 320px"
                  className="object-contain bg-[#f5efe6] p-4"
                />

              </div>
            </div>
          </FadeIn>

          {/* TEXT */}
          <FadeIn>
            <div className="rounded-[28px] border border-[#decdba] bg-white/70 p-6 shadow-[0_16px_40px_rgba(24,17,10,0.08)] backdrop-blur-sm md:p-8">
              <h2 className="mb-5 text-3xl font-light tracking-[-0.02em] text-[#1f1710]">
                madebyhr — from code to cloth
              </h2>

              <div className="space-y-4">
                {storyParagraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={`text-sm leading-[1.72] ${index === storyParagraphs.length - 1 ? "pt-2 font-medium text-[#2f2418]" : "text-[#5c4f43]"}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

            </div>
          </FadeIn>

        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[linear-gradient(180deg,#f1e7d9_0%,#ede1d2_100%)] py-16 px-6 md:px-16">
        <div className="grid gap-10 text-center md:grid-cols-3">

          {valuePillars.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl border border-[#dbcab6] bg-white/45 px-5 py-7 transition hover:border-[#caa987] hover:bg-white/65 hover:shadow-[0_20px_38px_rgba(17,17,17,0.1)]"
            >
              <div className="mb-3 text-2xl">
                {item[0]}
              </div>
              <h3 className="font-medium text-[#2f2418]">{item[1]}</h3>
              <p className="mt-2 text-sm text-[#5f5246]">{item[2]}</p>
            </div>
          ))}

        </div>
      </section>

      {/* POLICIES */}
      <section className="px-6 md:px-16 py-20">

        <FadeIn>
          <h2 className="mb-12 text-center text-3xl font-light tracking-[-0.02em] text-[#1f1710]">
            Terms & Policies
          </h2>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {policyItems.map((item, i) => (
            <FadeIn key={i}>
              <div className="rounded-2xl border border-[#e2d4c3] bg-white/85 p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#cbab89] hover:shadow-[0_18px_36px_rgba(17,17,17,0.1)]">
                <h3 className="mb-3 text-lg font-medium text-[#2b2117]">{item[0]}</h3>
                <p className="text-sm text-[#5f5246] leading-[1.65]">{item[1]}</p>
              </div>
            </FadeIn>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 pb-24">
        <FadeIn>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[30px] border border-[#d9c8b4] bg-[linear-gradient(135deg,#1f1710_0%,#2c2118_45%,#3a2a1f_100%)] px-6 py-10 text-[#f4eadf] shadow-[0_24px_58px_rgba(18,12,8,0.28)] md:px-10 md:py-12">
            <div className="flex flex-col items-center gap-5 text-center">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#d8c6ae]">Ready to Wear Something Personal?</p>
              <h3 className="max-w-2xl text-3xl md:text-5xl font-light tracking-[-0.03em] leading-tight">
                Choose your piece.
                We craft it only for you.
              </h3>
              <p className="max-w-2xl text-sm md:text-base leading-[1.7] text-[#e8daca]">
                Explore the collection, find your fit, and order with confidence. Every piece is intentional, made after you choose.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center rounded-full bg-[#f3e5d4] px-7 py-3 text-xs uppercase tracking-[0.18em] text-[#2a1f15] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_30px_rgba(255,255,255,0.18)]"
                >
                  Explore Outfits
                </Link>
                <a
                  href="https://www.instagram.com/madebyhr.co?igsh=emd2cmVtYjJpN2U0"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#8b6b50] bg-transparent px-7 py-3 text-xs uppercase tracking-[0.18em] text-[#f0deca] transition duration-300 hover:-translate-y-0.5 hover:border-[#b28963] hover:bg-[#4a3628]/55"
                >
                  Our Instagram
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />

    </main>
  );
}