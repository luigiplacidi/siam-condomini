"use client";

import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
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

type CarouselViewportProps = {
  children: ReactNode;
  onPause: () => void;
  onResume: () => void;
  onDragStart: (event: React.MouseEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  viewportRef: React.RefObject<HTMLDivElement | null>;
  onClickCapture: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function CarouselViewport({
  children,
  onPause,
  onResume,
  onDragStart,
  isDragging,
  viewportRef,
  onClickCapture
}: CarouselViewportProps) {
  return (
    <div
      ref={viewportRef}
      className={`scrollbar-hidden news-carousel-viewport cursor-grab overflow-x-auto overscroll-x-contain select-none [touch-action:pan-y] ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      onMouseDown={onDragStart}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}

export function NewsCarousel({ items }: NewsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const loopedItems = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const getSegmentWidth = () => viewport.scrollWidth / 3;

    const centerToMiddle = () => {
      const segmentWidth = getSegmentWidth();
      if (segmentWidth > viewport.clientWidth) {
        viewport.scrollLeft = segmentWidth;
      }
    };

    centerToMiddle();
    window.addEventListener("resize", centerToMiddle);

    const tick = () => {
      const segmentWidth = getSegmentWidth();
      if (!isPausedRef.current && !isDraggingRef.current && segmentWidth > viewport.clientWidth) {
        if (viewport.scrollLeft <= 0) {
          viewport.scrollLeft = segmentWidth;
        }

        viewport.scrollLeft += 0.45;

        if (viewport.scrollLeft >= segmentWidth * 2) {
          viewport.scrollLeft -= segmentWidth;
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", centerToMiddle);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      event.preventDefault();
      const viewport = viewportRef.current;
      if (!viewport) return;

      const deltaX = event.clientX - dragStartXRef.current;
      if (Math.abs(deltaX) > 4) {
        hasDraggedRef.current = true;
      }

      viewport.scrollLeft = scrollStartRef.current - deltaX;
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      isPausedRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: false });
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    event.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    isPausedRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = event.clientX;
    scrollStartRef.current = viewport.scrollLeft;
  };

  const handleNudge = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    isPausedRef.current = true;
    viewport.scrollBy({ left: direction * Math.max(320, viewport.clientWidth * 0.78), behavior: "smooth" });
    window.setTimeout(() => {
      if (!isDraggingRef.current) {
        isPausedRef.current = false;
      }
    }, 600);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent lg:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent lg:w-20" />

      <button
        type="button"
        aria-label="Scorri a sinistra"
        className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-primary shadow-soft transition hover:bg-white md:left-4"
        onClick={() => handleNudge(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Scorri a destra"
        className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-primary shadow-soft transition hover:bg-white md:right-4"
        onClick={() => handleNudge(1)}
      >
        <ArrowRight className="h-4 w-4" />
      </button>

      <CarouselViewport
        viewportRef={viewportRef}
        isDragging={isDragging}
        onPause={() => {
          isPausedRef.current = true;
        }}
        onResume={() => {
          if (!isDraggingRef.current) {
            isPausedRef.current = false;
          }
        }}
        onDragStart={handleDragStart}
        onClickCapture={(event) => {
          if (hasDraggedRef.current) {
            event.preventDefault();
            event.stopPropagation();
            hasDraggedRef.current = false;
          }
        }}
      >
        <div className="flex w-max gap-5 px-14 py-5 md:px-16">
          {loopedItems.map((item, index) => {
            const content = (
              <article
                className={`flex h-full min-h-[19rem] w-[19rem] flex-col rounded-[1.75rem] border border-border bg-gradient-to-br p-5 shadow-[0_10px_30px_rgba(14,39,66,0.08)] sm:w-[20.5rem] lg:w-[21.5rem] ${cardToneClasses[item.kind]}`}
                onMouseEnter={() => {
                  isPausedRef.current = true;
                }}
                onMouseLeave={() => {
                  if (!isDraggingRef.current) {
                    isPausedRef.current = false;
                  }
                }}
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
                {content}
              </a>
            ) : (
              <Link key={`${item.href}-${index}`} href={item.href as never} className="shrink-0" draggable={false}>
                {content}
              </Link>
            );
          })}
        </div>
      </CarouselViewport>
    </div>
  );
}

export type { NewsCarouselItem };
