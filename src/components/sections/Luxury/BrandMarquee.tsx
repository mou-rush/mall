"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { BRAND_LOGO_MAP } from "@/lib/constants";

interface BrandMarqueeProps {
  brands: string[];
  reverse?: boolean;
}

export default function BrandMarquee({
  brands,
  reverse = false,
}: Readonly<BrandMarqueeProps>) {
  const dir = reverse ? "r" : "f";
  const items = [
    ...brands.map((b) => ({ id: `${dir}-a-${b}`, label: b })),
    ...brands.map((b) => ({ id: `${dir}-b-${b}`, label: b })),
  ];

  return (
    <div className="overflow-hidden py-5 border-y border-[var(--moa-border)] mb-3 relative">
      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-32 
                      bg-gradient-to-r from-[var(--moa-black)] to-transparent z-10"
      />
      <div
        className="absolute inset-y-0 right-0 w-32 
                      bg-gradient-to-l from-[var(--moa-black)] to-transparent z-10"
      />

      <motion.div
        className="flex items-center gap-16 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item) => {
          const logo = BRAND_LOGO_MAP[item.label];
          return logo ? (
            <div
              key={item.id}
              className="relative h-9 w-28 flex-shrink-0 opacity-75 hover:opacity-100
                         transition-opacity duration-300"
            >
              <Image
                src={logo}
                alt={item.label}
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
          ) : (
            <span
              key={item.id}
              className="text-[var(--moa-muted)] font-light tracking-[0.12em]
                         text-sm uppercase hover:text-[var(--gold-light)]
                         transition-colors duration-300 cursor-default flex-shrink-0"
            >
              {item.label}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
