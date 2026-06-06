"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type FieldNote = {
  label: string;
  title: string;
  text: string;
  date: string;
  place: string;
  media: {
    type: string;
    src: string;
    poster: string;
  };
  link: string;
};

type ScrollState = {
  canScrollLeft: boolean;
  canScrollRight: boolean;
};

function FieldNoteCard({ note }: { note: FieldNote }) {
  return (
    <article
      data-field-note-card
      className="group h-full w-full border border-paper/14 bg-paper/[0.07] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.16)] transition-colors duration-300 hover:border-paper/24 hover:bg-paper/[0.09]"
    >
      <div className="overflow-hidden">
        {note.media.type === "video" ? (
          <video
            className="aspect-[4/5] w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
            src={note.media.src}
            poster={note.media.poster}
            controls
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src={note.media.src}
            alt=""
            width={720}
            height={960}
            className="aspect-[4/5] w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="p-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold">
          {note.label}
        </p>
        <h3 className="mt-3 font-display text-3xl font-semibold">{note.title}</h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-paper/48">
          <span>{note.date}</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            {note.place}
          </span>
        </p>
        <p className="mt-3 leading-7 text-paper/68">{note.text}</p>
        <a
          href={note.link}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-marigold"
        >
          View post
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}

export function FieldNotesCarousel({ notes }: { notes: FieldNote[] }) {
  const desktopScrollerRef = useRef<HTMLDivElement>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState<1 | -1>(1);
  const [desktopScrollState, setDesktopScrollState] = useState<ScrollState>({
    canScrollLeft: false,
    canScrollRight: notes.length > 1
  });

  const activeMobileNote = notes[mobileIndex];
  const canShowPreviousMobile = mobileIndex > 0;
  const canShowNextMobile = mobileIndex < notes.length - 1;

  const updateDesktopScrollState = useCallback(() => {
    const scroller = desktopScrollerRef.current;

    if (!scroller) {
      return;
    }

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const scrollLeft = Math.ceil(scroller.scrollLeft);

    setDesktopScrollState({
      canScrollLeft: scrollLeft > 2,
      canScrollRight: scrollLeft < maxScrollLeft - 2
    });
  }, []);

  const showMobileCard = (direction: "previous" | "next") => {
    setMobileDirection(direction === "next" ? 1 : -1);
    setMobileIndex((currentIndex) => {
      if (direction === "previous") {
        return Math.max(currentIndex - 1, 0);
      }

      return Math.min(currentIndex + 1, notes.length - 1);
    });
  };

  const scrollDesktopCards = (direction: "previous" | "next") => {
    const scroller = desktopScrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: direction === "next" ? scroller.clientWidth : -scroller.clientWidth,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const scroller = desktopScrollerRef.current;

    if (!scroller) {
      return;
    }

    updateDesktopScrollState();
    scroller.addEventListener("scroll", updateDesktopScrollState, { passive: true });
    window.addEventListener("resize", updateDesktopScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateDesktopScrollState);
      window.removeEventListener("resize", updateDesktopScrollState);
    };
  }, [updateDesktopScrollState]);

  return (
    <div className="mt-12 border-t border-paper/10 pt-6">
      <div className="relative sm:hidden">
        <button
          type="button"
          aria-label="Show previous field notes"
          onClick={() => showMobileCard("previous")}
          disabled={!canShowPreviousMobile}
          className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-paper/22 bg-ink/78 text-paper shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur transition hover:border-marigold hover:bg-marigold hover:text-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-paper/22 disabled:hover:bg-ink/78 disabled:hover:text-paper"
        >
          <ChevronLeft size={22} />
        </button>

        <div data-field-notes-mobile className="overflow-hidden">
          <AnimatePresence mode="wait" custom={mobileDirection} initial={false}>
            <motion.div
              key={activeMobileNote.title}
              custom={mobileDirection}
              initial={{ opacity: 0, x: mobileDirection * 34 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mobileDirection * -24 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-full max-w-[24rem] transform-gpu will-change-transform"
            >
              <FieldNoteCard note={activeMobileNote} />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="Show next field notes"
          onClick={() => showMobileCard("next")}
          disabled={!canShowNextMobile}
          className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-paper/22 bg-ink/78 text-paper shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur transition hover:border-marigold hover:bg-marigold hover:text-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-paper/22 disabled:hover:bg-ink/78 disabled:hover:text-paper"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="relative hidden sm:block">
        <button
          type="button"
          aria-label="Show previous field notes"
          onClick={() => scrollDesktopCards("previous")}
          disabled={!desktopScrollState.canScrollLeft}
          className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-paper/20 bg-ink/78 text-paper shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur transition hover:border-marigold hover:bg-marigold hover:text-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-paper/20 disabled:hover:bg-ink/78 disabled:hover:text-paper lg:left-4"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          ref={desktopScrollerRef}
          data-field-notes-desktop
          className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex snap-x snap-mandatory gap-5">
            {notes.map((note) => (
              <div
                key={note.title}
                className="w-[21rem] shrink-0 snap-start lg:w-[24rem]"
              >
                <FieldNoteCard note={note} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Show next field notes"
          onClick={() => scrollDesktopCards("next")}
          disabled={!desktopScrollState.canScrollRight}
          className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-paper/20 bg-ink/78 text-paper shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur transition hover:border-marigold hover:bg-marigold hover:text-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-paper/20 disabled:hover:bg-ink/78 disabled:hover:text-paper lg:right-4"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
