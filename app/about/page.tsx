"use client";

import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";

export default function AboutPage() {
  return (
    <main className="bg-[#f5efe6] text-[#2d2d2d] overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center justify-center text-center px-6">

        <div className="absolute w-[500px] h-[500px] bg-[#e8dfd3] rounded-full blur-3xl opacity-40 top-[-120px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-[#e0d6c8] rounded-full blur-3xl opacity-40 bottom-[-120px] right-[-120px]" />

        <div className="relative z-10 max-w-3xl">

          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-light leading-tight">
              About <span className="italic">madebyhr</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="w-16 h-[1px] bg-[#b08968] mx-auto my-6"></div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Not just clothing — a slower, more personal way of dressing.
              Every piece is created with intention, made only for you.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="mt-6 text-xs tracking-widest text-gray-400 uppercase">
              Made slowly · Worn proudly
            </p>
          </FadeIn>

        </div>
      </section>

      {/* STORY */}
      <section className="px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <FadeIn>
            <div className="flex justify-center">
              <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-500">

                <Image
                  src="/story.jpg"
                  alt="founders"
                  fill
                  sizes="(max-width: 768px) 260px, 320px"
                  className="object-contain bg-[#f5efe6] p-3 transition duration-700"
                />

              </div>
            </div>
          </FadeIn>

          {/* TEXT */}
          <FadeIn delay={0.2}>
            <div>

              <h2 className="text-3xl font-light mb-4">
                Our Story
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed">
                madebyhr - from code to cloth
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                We are not a big brand.
                We did not start with funding, factories, or a team.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                We started with an idea.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                Two school friends, who somehow ended up in the same engineering college, studying Computer Science. Between assignments, coding nights, and endless conversations about the future, one thing kept coming back -
                &quot;What if we build something of our own?&quot;
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                That is where madebyhr began.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                We did not have a big budget.
                We did not want to take big risks with unsold stock.
                And we did not want to create just another clothing brand.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                So we decided to build it differently.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                We combined what we know - technology - with what we love - design and clothing.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                Using AI as a creative tool, we started designing pieces that are unique, minimal, and expressive. But every design does not stop at AI - we carefully refine, select, and bring it to life ourselves.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                Each product you see here is not mass-produced.
                It is made only when you order it.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                No extra inventory.
                No waste.
                No unnecessary production.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                Just something made specifically for you.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                We know that trusting a new brand is not easy - especially when everything is online.
                That is why we believe in being transparent.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                From design to delivery, we are building this brand in the open - sharing our journey, our process, and every step we take.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                When you support madebyhr, you are not just buying clothing.
                You are supporting two students building something from scratch - with limited resources, but unlimited ideas.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                This is just the beginning.
              </p>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                - Team madebyhr
              </p>

            </div>
          </FadeIn>

        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#efe7dc] py-16 px-6 md:px-16">
        <div className="grid md:grid-cols-3 gap-10 text-center">

          {[
            ["🧵", "Made to Order", "Crafted only after you place your order."],
            ["✨", "Limited Pieces", "Every design exists in small, exclusive quantities."],
            ["🌿", "Thoughtful Design", "Comfort, longevity, and elegance combined."],
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.2}>
              <div className="hover:scale-105 transition">
                <div className="text-2xl mb-3">{item[0]}</div>
                <h3 className="font-medium">{item[1]}</h3>
                <p className="text-sm text-gray-600 mt-2">{item[2]}</p>
              </div>
            </FadeIn>
          ))}

        </div>
      </section>

      {/* POLICIES */}
      <section className="px-6 md:px-16 py-20">

        <FadeIn>
          <h2 className="text-3xl text-center font-light mb-12">
            Terms & Policies
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            ["🧵 Made-to-Order", "Production begins immediately after your order is confirmed."],
            ["✨ Limited Edition", "Each design is produced in limited quantities and not restocked."],
            ["💳 Prepaid Only", "All orders must be prepaid. COD is not available."],
            ["📏 Size Selection", "Check size chart carefully. Changes allowed only before shipping."],
            ["❌ No Cancellation", "Orders cannot be cancelled once confirmed."],
            ["🚚 Delivery", "Estimated delivery within 15 working days."],
            ["♻️ Returns", "Accepted within 2–3 days if unused with tags."],
            ["💰 Refunds", "Processed after inspection for defects or issues."],
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-medium mb-3">{item[0]}</h3>
                <p className="text-sm text-gray-600">{item[1]}</p>
              </div>
            </FadeIn>
          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-6 text-sm">
        © {new Date().getFullYear()} madebyhr. All rights reserved.
      </footer>

    </main>
  );
}