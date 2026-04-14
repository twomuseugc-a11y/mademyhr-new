import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#f5efe6] text-[#2d2d2d]">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

        {/* GLOW */}
        <div className="absolute w-[600px] h-[600px] bg-[#e8dfd3] rounded-full blur-3xl opacity-40 top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-[#e0d6c8] rounded-full blur-3xl opacity-40 bottom-[-100px] right-[-100px]" />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-7xl font-light leading-tight">
            Made slowly,<br />
            <span className="italic">worn proudly.</span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-md mx-auto">
            Thoughtfully crafted pieces designed for comfort, simplicity,
            and timeless everyday wear.
          </p>

          <div className="mt-8">
            <a
              href="#collection"
              className="px-8 py-3 bg-[#b08968] text-white rounded-full text-sm hover:bg-[#9c7052] transition"
            >
              Explore Collection
            </a>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="px-6 md:px-10 py-20">

        <h2 className="text-3xl text-center mb-12 font-light">
          Our Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

          {[
            { name: "Linen Wrap Dress", price: "₹4,200", img: "/product1.jpg" },
            { name: "Cozy Knit Sweater", price: "₹2,800", img: "/product2.jpg" },
            { name: "Satin Midi Skirt", price: "₹3,200", img: "/product3.jpg" },
          ].map((item, i) => (
            <Link href="/product" key={i} className="group block">

              <div className="relative w-full h-[280px] overflow-hidden rounded-xl">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <h3 className="mt-3 text-sm">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.price}</p>

            </Link>
          ))}

        </div>
      </section>

      {/* WHY US */}
      <section className="px-6 md:px-16 py-20 bg-[#efe7dc]">

        <h2 className="text-3xl text-center font-light mb-12">
          Why madebyhr
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div>
            <div className="text-2xl mb-3">🎀</div>
            <h3 className="font-medium">Made to Order</h3>
            <p className="text-sm text-gray-600 mt-2">
              Each piece is crafted only after you order.
            </p>
          </div>

          <div>
            <div className="text-2xl mb-3">🧵</div>
            <h3 className="font-medium">No Mass Production</h3>
            <p className="text-sm text-gray-600 mt-2">
              Slow fashion that values quality over quantity.
            </p>
          </div>

          <div>
            <div className="text-2xl mb-3">🌿</div>
            <h3 className="font-medium">Crafted with Care</h3>
            <p className="text-sm text-gray-600 mt-2">
              Designed for comfort and timeless wear.
            </p>
          </div>

        </div>
      </section>

      {/* OUR STORY (PREMIUM IMAGE FIXED) */}
      <section className="px-6 md:px-16 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* PREMIUM IMAGE */}
          <div className="p-2 bg-white/40 backdrop-blur-md rounded-[28px]">
            <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] group">

              <Image
                src="/story.jpg"
                alt="madebyhr story"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70"></div>

              {/* border */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5"></div>

            </div>
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-light mb-6">
              Our Story
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed">
              madebyhr began with two best friends who believed clothing should feel more personal.
            </p>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              In a world of fast fashion, we chose to slow things down — creating pieces that are made only when you choose them.
            </p>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Every design is crafted with care, but what makes it special is you. When something is made just for you, it carries a different feeling — more intentional, more personal, more yours.
            </p>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              We don’t create in bulk. Each piece is made to order, giving you something exclusive — not just clothing, but an experience.
            </p>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              madebyhr is about that feeling — effortless, premium, and quietly confident.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-6 text-sm">
        © {new Date().getFullYear()} madebyhr. All rights reserved.
      </footer>

    </main>
  );
}