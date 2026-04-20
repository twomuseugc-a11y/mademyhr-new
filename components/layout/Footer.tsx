import Link from "next/link";

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="m6.5 7.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M20 11.8a7.8 7.8 0 0 1-11.66 6.75L4 19l1.5-4.05A7.8 7.8 0 1 1 20 11.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 8.9c.2-.4.4-.4.6-.4h.5c.2 0 .4.1.5.4l.8 1.7c.1.2.1.4 0 .6l-.4.5c-.1.2-.1.4 0 .6.4.8 1.1 1.5 1.9 1.9.2.1.4.1.6 0l.5-.4c.2-.1.4-.1.6 0l1.7.8c.3.1.4.3.4.5v.5c0 .2 0 .4-.4.6-.4.3-1 .6-1.8.6-1.8 0-3.7-.8-5.2-2.3S7.3 11.8 7.3 10c0-.8.3-1.4.6-1.8Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.7" cy="7.3" r="0.9" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-white/10 bg-[#11100e] text-[#f5efe6]">
      <div className="absolute -top-28 left-[-80px] h-56 w-56 rounded-full bg-[#d9c9b4]/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-28 right-[-80px] h-56 w-56 rounded-full bg-[#ffffff]/5 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.35fr_0.75fr_0.75fr] md:items-start">
          <div className="max-w-md text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#b8aa99]">Our Story</p>
            <h2 className="mt-4 font-['Iowan_Old_Style','Book_Antiqua','Palatino_Linotype',serif] text-3xl md:text-5xl font-light leading-tight tracking-[-0.03em] text-white">
              Made with intention, finished with quiet confidence.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#d2c8bc]">
              madebyhr creates only after you choose, so every piece feels personal, measured, and made to belong to you.
            </p>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#b8aa99]">Contact Us</p>
            <div className="mt-4 space-y-3 text-sm text-[#eadfd1]">
              <a href="mailto:madebyhrclothing@gmail.com" className="flex items-center justify-center md:justify-start gap-2 transition hover:opacity-70">
                <EmailIcon />
                <span>madebyhrclothing@gmail.com</span>
              </a>
              <a href="https://wa.me/919902379397" target="_blank" rel="noreferrer" className="flex items-center justify-center md:justify-start gap-2 transition hover:opacity-70 hover:scale-[1.01]">
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
              <Link href="/about" className="inline-flex items-center justify-center md:justify-start text-xs uppercase tracking-[0.22em] text-[#b8aa99] transition hover:text-white">
                About the brand
              </Link>
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#b8aa99]">Our Handles</p>
            <div className="mt-4 space-y-3 text-sm text-[#eadfd1]">
              <a href="https://www.instagram.com/madebyhr.co?igsh=emd2cmVtYjJpN2U0" target="_blank" rel="noreferrer" className="flex items-center justify-center md:justify-start gap-2 transition hover:opacity-70 hover:scale-[1.01]">
                <InstagramIcon />
                <span>Instagram</span>
              </a>
              <Link href="#collection" className="inline-flex items-center justify-center md:justify-start text-xs uppercase tracking-[0.22em] text-[#b8aa99] transition hover:text-white">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs text-[#9a8d7c]">© {new Date().getFullYear()} madebyhr. All rights reserved.</p>
          <Link href="/login" className="text-xs uppercase tracking-[0.22em] text-[#9a8d7c] transition hover:text-white">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
