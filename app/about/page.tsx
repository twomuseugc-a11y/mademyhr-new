import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-[#f5efe6] text-[#2d2d2d] overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center justify-center text-center px-6">

        {/* BACKGROUND BLOBS */}
        <div className="absolute w-[500px] h-[500px] bg-[#e8dfd3] rounded-full blur-3xl opacity-40 top-[-120px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-[#e0d6c8] rounded-full blur-3xl opacity-40 bottom-[-120px] right-[-120px]" />

        <div className="relative z-10 max-w-3xl">

          <h1 className="text-4xl md:text-6xl font-light leading-tight animate-fadeIn">
            About <span className="italic">madebyhr</span>
          </h1>

          <div className="w-16 h-[1px] bg-[#b08968] mx-auto my-6"></div>

          <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Not just clothing — a slower, more personal way of dressing.
            Every piece is created with intention, made only for you.
          </p>

          <p className="mt-6 text-xs tracking-widest text-gray-400 uppercase">
            Made slowly · Worn proudly
          </p>

        </div>
      </section>

      {/* STORY */}
      <section className="px-6 md:px-16 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-500">

              <Image
                src="/story.jpg"
                alt="founders"
                fill
                className="object-contain bg-[#f5efe6] p-3"
              />

            </div>
          </div>

          {/* TEXT */}
          <div>

            <h2 className="text-3xl font-light mb-4">
              Our Story
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed">
              madebyhr began with two best friends who believed clothing should feel more personal.
            </p>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              In a world of fast fashion, we chose to slow things down — creating pieces that are made only when you choose them.
            </p>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              When something is designed and tailored for you, the feeling is different — more intentional, more personal, more yours.
            </p>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              madebyhr is about that feeling — effortless, premium, and quietly confident.
            </p>

          </div>

        </div>

      </section>

      {/* VALUES STRIP (NEW - MAKES IT LOOK RICH) */}
      <section className="bg-[#efe7dc] py-16 px-6 md:px-16">

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="hover:scale-105 transition">
            <div className="text-2xl mb-3">🧵</div>
            <h3 className="font-medium">Made to Order</h3>
            <p className="text-sm text-gray-600 mt-2">
              Crafted only after you place your order.
            </p>
          </div>

          <div className="hover:scale-105 transition">
            <div className="text-2xl mb-3">✨</div>
            <h3 className="font-medium">Limited Pieces</h3>
            <p className="text-sm text-gray-600 mt-2">
              Every design exists in small, exclusive quantities.
            </p>
          </div>

          <div className="hover:scale-105 transition">
            <div className="text-2xl mb-3">🌿</div>
            <h3 className="font-medium">Thoughtful Design</h3>
            <p className="text-sm text-gray-600 mt-2">
              Comfort, longevity, and elegance combined.
            </p>
          </div>

        </div>

      </section>

      {/* POLICIES */}
      <section className="px-6 md:px-16 py-20">

        <h2 className="text-3xl text-center font-light mb-12">
          Terms & Policies
        </h2>

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
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-medium mb-3">{item[0]}</h3>
              <p className="text-sm text-gray-600">{item[1]}</p>
            </div>
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