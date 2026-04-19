import type { ReactNode } from "react";

export default function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-3xl md:text-4xl text-center font-light tracking-wide">{children}</h2>;
}
