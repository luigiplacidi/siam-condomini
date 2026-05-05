"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";

type NewsCarouselItem = {
  kind: "article" | "resource";
  label: string;
  title: string;
  excerpt: string;
  href: string;
  meta: string;
  external?: boolean;
};

type NewsCarouselProps = {
  items: NewsCarouselItem[];
};

const cardToneClasses = {
  article: "from-primary/10 via-white to-secondary/25",
  resource: "from-accent/10 via-white to-secondary/25"
} as const;

type DraggableTrackProps = {
  children: ReactNode;
};

function DraggableTrack({ children }: DraggableTrackProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const tick = () => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        const segmentWidth = viewport.scrollWidth / 3;
        if (segmentWidth > viewport.clientWidth) {
          if (viewport.scrollLeft === 0) {
            viewport.scrollLeft = segmentWidth;
          }

          viewport.scrollLeft += 0.45;

          if (viewport.scrollLeft >= segmentWidth * 2) {
            viewport.scrollLeft -= segmentWidth;
          }
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const initializePosition = () => {
      const segmentWidth = viewport.scrollWidth / 3;
      if (segmentWidth > viewport.clientWidth && viewport.scrollLeft === 0) {
        viewport.scrollLeft = segmentWidth;
      }
    };

    initializePosition();
    window.addEventListener("resize", initializePosition);

    const onPointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current || activePointerIdRef.current !== event.pointerId) return;
      event.preventDefault();
      const deltaX = event.clientX - dragStartXRef.current;
      viewport.scrollLeft = scrollStartRef.current - deltaX;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!isDraggingRef.current || activePointerIdRef.current !== event.pointerId) return;
      isDraggingRef.current = false;
      activePointerIdRef.current = null;
      setIsDragging(false);
      isPausedRef.current = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", initializePosition);
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    isDraggingRef.current = true;
    activePointerIdRef.current = event.pointerId;
    setIsDragging(true);
    isPausedRef.current = true;
    dragStartXRef.current = event.clientX;
    scrollStartRef.current = viewport.scrollLeft;
  };

  return (
    <div
      ref={viewportRef}
      className={`news-carousel-viewport cursor-grab overflow-x-auto overscroll-x-contain scroll-smooth select-none [touch-action:pan-y] ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      onPointerDown={handlePointerDown}
      onPointerEnter={() => {
        isPausedRef.current = true;
      }}
      onPointerLeave={() => {
        if (!isDraggingRef.current) {
          isPausedRef.current = false;
        }
      }}
    >
      {children}
    </div>
  );
}

export function NewsCarousel({ items }: NewsCarouselProps) {
  const loopedItems = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent lg:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent lg:w-20" />

      <DraggableTrack>
      <div className="flex w-max gap-5 px-5 py-5">
          {loopedItems.map((item, index) => {
            const card = (
              <article
                className={`flex h-full min-h-[19rem] w-[19rem] flex-col rounded-[1.75rem] border border-border bg-gradient-to-br p-5 shadow-[0_10px_30px_rgba(14,39,66,0.08)] sm:w-[20.5rem] lg:w-[21.5rem] ${cardToneClasses[item.kind]}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
                    {item.label}
                  </span>
                  <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.meta}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold leading-tight text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>

                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {item.external ? "Vai al sito" : "Leggi articolo"}
                    {item.external ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </span>
                </div>
              </article>
            );

            return item.external ? (
              <a
                key={`${item.href}-${index}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
                draggable={false}
              >
                {card}
              </a>
            ) : (
              <Link key={`${item.href}-${index}`} href={item.href as never} className="shrink-0" draggable={false}>
                {card}
              </Link>
            );
          })}
        </div>
      </DraggableTrack>
    </div>
  );
}

export type { NewsCarouselItem };
