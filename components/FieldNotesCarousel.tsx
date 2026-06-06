"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";

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

export function FieldNotesCarousel({ notes }: { notes: FieldNote[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const canShowPrevious = activeIndex > 0;
  const canShowNext = activeIndex < notes.length - 1;

  const showCard = (direction: "previous" | "next") => {
    setDirection(direction === "next" ? 1 : -1);
    setActiveIndex((currentIndex) => {
      if (direction === "previous") {
        return Math.max(currentIndex - 1, 0);
      }

      return Math.min(currentIndex + 1, notes.length - 1);
    });
  };
  const activeNote = notes[activeIndex];

  return (
    <div className="mt-12 border-t border-paper/10 pt-6">
      <div className="relative">
        <button
          type="button"
          aria-label="Show previous field notes"
          onClick={() => showCard("previous")}
          disabled={!canShowPrevious}
          className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-paper/22 bg-ink/78 text-paper shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur transition hover:border-marigold hover:bg-marigold hover:text-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-paper/22 disabled:hover:bg-ink/78 disabled:hover:text-paper sm:left-4 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          data-field-notes-scroller
          className="overflow-hidden"
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.article
              key={activeNote.title}
              data-field-note-card
              custom={direction}
              initial={{ opacity: 0, x: direction * 34 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="group mx-auto h-full w-full max-w-[24rem] transform-gpu border border-paper/14 bg-paper/[0.07] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.16)] will-change-transform transition-colors duration-300 hover:border-paper/24 hover:bg-paper/[0.09]"
            >
              <div className="overflow-hidden">
                {activeNote.media.type === "video" ? (
                  <video
                    className="aspect-[4/5] w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                    src={activeNote.media.src}
                    poster={activeNote.media.poster}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={activeNote.media.src}
                    alt=""
                    width={720}
                    height={960}
                    className="aspect-[4/5] w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold">
                  {activeNote.label}
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold">{activeNote.title}</h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-paper/48">
                  <span>{activeNote.date}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} />
                    {activeNote.place}
                  </span>
                </p>
                <p className="mt-3 leading-7 text-paper/68">{activeNote.text}</p>
                <a
                  href={activeNote.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-marigold"
                >
                  View post
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="Show next field notes"
          onClick={() => showCard("next")}
          disabled={!canShowNext}
          className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-paper/22 bg-ink/78 text-paper shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur transition hover:border-marigold hover:bg-marigold hover:text-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-paper/22 disabled:hover:bg-ink/78 disabled:hover:text-paper sm:right-4 sm:h-12 sm:w-12"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
