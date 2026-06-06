import Image from "next/image";
import {
  ArrowDownRight,
  BadgeCheck,
  BookOpen,
  HandHeart,
  HeartHandshake,
  Instagram,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { ActionComposer } from "@/components/ActionComposer";
import { FieldNotesCarousel } from "@/components/FieldNotesCarousel";
import { Reveal } from "@/components/Reveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { siteConfig } from "@/data/siteConfig";
import {
  decisions,
  donationOptions,
  faqs,
  fieldNotes,
  heroMedia,
  impactAreas,
  stats
} from "@/data/siteContent";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Donate", href: "#donate" },
  { label: "Enquire", href: "#enquire" }
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-river">
      <span className="h-px w-8 bg-river/50" />
      {children}
    </p>
  );
}

function PrimaryLink({
  href,
  children,
  icon
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-center justify-center gap-3 bg-ink px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-paper transition hover:bg-river"
    >
      {icon}
      {children}
      <ArrowDownRight
        size={18}
        className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5"
      />
    </a>
  );
}

function SecondaryLink({
  href,
  children,
  icon,
  external
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center justify-center gap-3 border border-ink/20 bg-paper/30 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:border-river hover:text-river"
    >
      {icon}
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <SmoothScroll />

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-ink/10 bg-paper/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <Image
              src={siteConfig.profileImage}
              alt=""
              width={42}
              height={42}
              className="h-10 w-10 rounded-full border border-ink/15 object-cover"
            />
            <div>
              <p className="font-display text-xl font-bold leading-none">{siteConfig.name}</p>
              <p className="hidden text-xs uppercase tracking-[0.22em] text-ink/55 sm:block">
                NGO
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-ink/68 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-river">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#donate"
            className="inline-flex items-center gap-2 bg-moss px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-paper transition hover:bg-river"
          >
            <HandHeart size={16} />
            Donate
          </a>
        </div>
      </header>

      <section className="relative min-h-screen overflow-hidden pt-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[0.93fr_1.07fr] lg:px-8 lg:pb-20 lg:pt-14">
          <Reveal className="flex flex-col justify-center">
            <p className="mb-5 inline-flex w-fit items-center gap-2 border border-moss/20 bg-white/50 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-moss">
              <ShieldCheck size={15} />
              {siteConfig.category}
            </p>
            <h1 className="balance font-display text-5xl font-semibold leading-[0.92] text-ink sm:text-6xl lg:text-8xl">
              Together for change. United in impact.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink/72 sm:mt-6 sm:text-lg sm:leading-8">
              Companions in Action brings volunteers, children, women, and local communities
              together through learning circles, dignity drives, and field work that starts
              with listening.
            </p>

            <div className="mt-8 grid gap-3 sm:flex">
              <PrimaryLink href="#donate" icon={<HeartHandshake size={19} />}>
                Donate
              </PrimaryLink>
              <SecondaryLink href="#enquire" icon={<MessageCircle size={19} />}>
                Enquire
              </SecondaryLink>
            </div>

            <div className="mt-10 grid grid-cols-3 border-y border-ink/12 text-center sm:max-w-xl">
              <div className="py-4 sm:py-5">
                <p className="font-display text-2xl font-semibold sm:text-3xl">{siteConfig.socialProof.followers}</p>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ink/52 sm:text-xs sm:tracking-[0.16em]">Followers</p>
              </div>
              <div className="border-x border-ink/12 py-4 sm:py-5">
                <p className="font-display text-2xl font-semibold sm:text-3xl">{siteConfig.socialProof.posts}</p>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ink/52 sm:text-xs sm:tracking-[0.16em]">Posts</p>
              </div>
              <div className="py-4 sm:py-5">
                <p className="font-display text-2xl font-semibold sm:text-3xl">{siteConfig.socialProof.highlights}</p>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ink/52 sm:text-xs sm:tracking-[0.16em]">Highlights</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[720px]">
            <div className="media-vignette absolute right-0 top-0 h-[68%] w-[72%] overflow-hidden border border-white/50 bg-ink shadow-soft sm:h-[72%] sm:w-[78%]">
              <video
                className="h-full w-full object-cover"
                src={heroMedia.mainVideo}
                poster={heroMedia.mainPoster}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            <div className="absolute bottom-12 left-0 w-[50%] overflow-hidden border border-white/70 bg-paper shadow-soft sm:bottom-20 sm:w-[54%]">
              <Image
                src={heroMedia.supportPhoto}
                alt="Children studying with volunteers during a Companions in Action session"
                width={640}
                height={960}
                className="aspect-[4/5] w-full object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-4 w-[38%] border border-ink/10 bg-paper p-2 shadow-soft sm:bottom-0 sm:right-8 sm:w-[42%] sm:p-3">
              <Image
                src={heroMedia.secondPhoto}
                alt="A field visit with children and volunteers"
                width={640}
                height={960}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-ink/68 sm:mt-3 sm:text-sm">
                <MapPin size={16} />
                {siteConfig.city}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ink py-5 text-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-center text-xs font-bold uppercase tracking-[0.2em] sm:px-6 lg:px-8">
          {siteConfig.trustSignals.map((signal) => (
            <span key={signal} className="inline-flex items-center gap-2">
              <BadgeCheck size={16} className="text-marigold" />
              {signal}
            </span>
          ))}
        </div>
      </section>

      <section id="work" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel>What the work holds</SectionLabel>
              <h2 className="balance font-display text-4xl font-semibold leading-[0.95] sm:text-5xl lg:text-6xl">
                Practical care, built one field day at a time.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-ink/70">
              The Instagram page shows a young field team doing direct, local work.
              They teach, distribute supplies, survey needs, talk about menstrual dignity,
              and invite more people to show up with time and care.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {impactAreas.map((area, index) => (
              <Reveal key={area.title} delay={index * 0.06}>
                <article className="group h-full border border-ink/12 bg-white/48 p-4 shadow-soft transition hover:-translate-y-1 hover:bg-white/70">
                  <div className="overflow-hidden">
                    <Image
                      src={area.image}
                      alt=""
                      width={720}
                      height={960}
                      className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-display text-3xl font-semibold">{area.title}</h3>
                    <p className="mt-3 leading-7 text-ink/68">{area.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linen px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <SectionLabel>Why people trust it</SectionLabel>
            <h2 className="balance font-display text-4xl font-semibold leading-[0.95] sm:text-5xl lg:text-6xl">
              Proof should be visible before anyone gives.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink/70">
              The site follows the strongest nonprofit pattern I found in leading education
              and charity websites: show official credibility, show current field work,
              then make the next step direct.
            </p>
            <div className="mt-8 grid gap-3">
              {siteConfig.trustSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-3 border-b border-ink/12 pb-3">
                  <ShieldCheck size={20} className="text-river" />
                  <span className="font-semibold">{signal}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.04}>
                <div className="border border-ink/12 bg-paper/80 p-6 shadow-soft">
                  <p className="font-display text-5xl font-semibold leading-none text-river sm:text-6xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-ink/56">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="donate" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <SectionLabel>Give with care</SectionLabel>
              <h2 className="balance font-display text-4xl font-semibold leading-[0.95] sm:text-5xl lg:text-6xl">
                Help a field day become possible.
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink/70">
                A live payment link was not visible in the Instagram profile. For now,
                donation starts as a direct message so the team can confirm details,
                receipts, and the right way to give.
              </p>
            </div>
            <div className="grid gap-4">
              {donationOptions.map((option) => (
                <div
                  key={option.title}
                  className="grid gap-4 border border-ink/12 bg-white/58 p-5 shadow-soft sm:grid-cols-[10rem_1fr]"
                >
                  <div>
                    <p className="font-display text-4xl font-semibold text-clay">{option.amount}</p>
                    {option.guessed ? (
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-ink/48">
                        Suggested
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{option.title}</h3>
                    <p className="mt-2 leading-7 text-ink/66">{option.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <ActionComposer mode="donate" />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <SectionLabel>Recent field notes</SectionLabel>
              <h2 className="balance font-display text-4xl font-semibold leading-[0.95] sm:text-5xl lg:text-6xl">
                Real posts, turned into a clear story.
              </h2>
            </div>
            <p className="text-lg leading-8 text-paper/72">
              Each card captures a real field moment: where the team showed up, what
              happened there, and why that small act of care mattered.
            </p>
          </Reveal>

          <FieldNotesCarousel notes={fieldNotes} />
        </div>
      </section>

      <section id="enquire" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionLabel>Join or ask</SectionLabel>
            <h2 className="balance font-display text-4xl font-semibold leading-[0.95] sm:text-5xl lg:text-6xl">
              Enquiries should feel simple.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink/70">
              Ask about donating, volunteering, partnerships, media, or bringing a drive
              to your area. You can use the Instagram DM path or the original form from
              the profile.
            </p>
            <div className="mt-8 grid gap-3 sm:flex">
              <SecondaryLink
                href={siteConfig.enquiryUrl}
                icon={<BookOpen size={19} />}
                external
              >
                Open form
              </SecondaryLink>
              <SecondaryLink
                href={siteConfig.instagramUrl}
                icon={<Instagram size={19} />}
                external
              >
                Instagram
              </SecondaryLink>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ActionComposer mode="enquire" />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionLabel>Questions</SectionLabel>
              <h2 className="balance font-display text-4xl font-semibold leading-[0.95] sm:text-5xl lg:text-6xl">
                A few answers before someone reaches out.
              </h2>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b border-ink/12 pb-5">
                  <h3 className="flex items-center gap-3 text-xl font-bold">
                    <Sparkles size={18} className="text-marigold" />
                    {faq.question}
                  </h3>
                  <p className="mt-3 leading-7 text-ink/68">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-ink px-4 py-12 text-paper sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Image
                src={siteConfig.profileImage}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border border-paper/20 object-cover"
              />
              <div>
                <p className="font-display text-3xl font-semibold">{siteConfig.name}</p>
                <p className="text-sm text-paper/58">{siteConfig.tagline}</p>
              </div>
            </div>
            <p className="max-w-2xl leading-7 text-paper/64">
              Registered nonprofit work, real field stories, and a clear way for supporters
              to donate, enquire, or join.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryLink href="#donate" icon={<HandHeart size={19} />}>
              Donate
            </PrimaryLink>
            <SecondaryLink href="#enquire" icon={<UsersRound size={19} />}>
              Enquire
            </SecondaryLink>
          </div>
        </div>
      </footer>

      <div className="hidden">
        <p>{decisions.businessType}</p>
        <p>{decisions.colours}</p>
        <p>{decisions.fonts}</p>
        <p>{decisions.media}</p>
        <p>{decisions.guessedItems}</p>
      </div>
    </main>
  );
}
