import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const mission = [
  {
    title: "Find faith.",
    scripture: "So faith comes from hearing, and hearing through the word of Christ.",
    description:
      "Discover a deeper connection with God through meaningful worship, powerful teaching, and a community that embraces your spiritual journey.",
  },
  {
    title: "Find family.",
    scripture: "For where two or three are gathered in my name, there am I among them.",
    description:
      "At our church, you are more than a member—you are part of a loving and supportive family that encourages you every step of the way.",
  },
  {
    title: "Find freedom.",
    scripture: "So if the Son sets you free, you will be free indeed.",
    description:
      "Break free from the burdens of the past and step into the life God has designed for you through the peace and healing found in Christ.",
  },
  {
    title: "Fulfill purpose.",
    scripture: "For we are his workmanship, created in Christ Jesus for good works.",
    description:
      "You were created with a purpose. We are here to help you discover it and step into the calling God has for your life.",
  },
];

const leaders = [
  {
    image: "/fcc1.webp",
    name: "Melvin Stringfield",
    role: "Lead Pastor",
  },
  {
    image: "/fcc5.webp",
    name: "Ariel Stringfield",
    role: "Lead Pastor",
  },
];

export default function Home() {
  return (
    <div className="bg-white text-black">
      <section className="px-4 pb-16 pt-10 sm:px-8 md:pb-24 md:pt-16">
        <div className="flex items-center justify-between border-b border-black pb-4 text-[10px] font-black tracking-[0.18em] uppercase sm:text-xs">
          <span>Moss Bluff, LA</span>
          <span>Sundays at 10:00 AM</span>
        </div>

        <h1 className="py-10 text-[clamp(3.5rem,11vw,9rem)] font-black leading-[0.79] tracking-[-0.075em] sm:py-14">
          <span className="block">Faith</span>
          <span className="block">Community</span>
          <span className="block">Church.</span>
        </h1>

        <div className="grid gap-8 border-t border-black pt-5 md:grid-cols-[1fr_1.7fr] md:items-end">
          <Link
            href="#mission"
            className="group inline-flex w-fit items-center gap-3 text-xs font-black tracking-[0.16em] uppercase transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Discover our heart
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" />
          </Link>
          <blockquote className="max-w-2xl text-lg font-medium leading-snug tracking-[-0.02em] sm:text-2xl">
            “If we walk in the light, as he is in the light, we have fellowship with one another.”
            <cite className="mt-3 block text-xs font-bold not-italic tracking-[0.14em] text-black/50 uppercase">
              1 John 1:7
            </cite>
          </blockquote>
        </div>
      </section>

      <div className="px-4 sm:px-8">
        <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 md:aspect-[16/9]">
          <Image
            src="/fcc6.webp"
            alt="Faith Community Church gathered together"
            fill
            priority
            sizes="(min-width: 768px) 75vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-white px-4 py-3 text-[10px] font-black tracking-[0.18em] uppercase sm:text-xs">
            Faith · Family · Freedom · Purpose
          </div>
        </div>
      </div>

      <section id="mission" className="scroll-mt-24 px-4 py-20 sm:px-8 md:py-32">
        <div className="grid gap-10 md:grid-cols-[1fr_3fr] md:gap-16">
          <div>
            <p className="text-xs font-black tracking-[0.2em] uppercase">Our mission</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.92] tracking-[-0.05em] sm:text-5xl">
              Four truths.
              <br />
              One calling.
            </h2>
          </div>

          <ol className="border-t border-black">
            {mission.map((item) => (
              <li
                key={item.title}
                className="border-b border-black py-8 md:py-10"
              >
                <div>
                  <h3 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                    {item.title}
                  </h3>
                  <div className="mt-5 grid gap-4 text-sm leading-6 md:grid-cols-2 md:gap-8">
                    <p>{item.description}</p>
                    <p className="italic text-black/50">“{item.scripture}”</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-black px-4 py-16 text-white sm:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <div className="py-2">
            <p className="text-xs font-black tracking-[0.2em] text-white/60 uppercase">
              Our community
            </p>
            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.055em] sm:text-7xl">
              There is a place for you here.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              We exist to inspire people to live faith-filled lives rooted in the love of Christ.
              Find belonging in a supportive community where we grow and thrive together.
            </p>
            <Link
              href="/connect"
              className="group mt-9 inline-flex items-center gap-3 border-b border-white pb-2 text-xs font-black tracking-[0.16em] uppercase transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Connect with us
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>

          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 sm:aspect-[16/10]">
              <Image
                src="/fcceaster.webp"
                alt="Faith Community Church families gathering for Easter"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-white/30 pt-3 text-[10px] font-bold tracking-[0.16em] text-white/55 uppercase">
              Easter at Faith Community Church
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 md:py-32">
        <div className="mb-10 flex items-end justify-between border-b border-black pb-5 md:mb-14">
          <div>
            <p className="text-xs font-black tracking-[0.2em] uppercase">Our leaders</p>
            <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.05em] sm:text-6xl">
              Meet our pastors.
            </h2>
          </div>
          <span className="hidden text-xs font-bold tracking-widest text-black/50 uppercase sm:block">
            Leading with faith
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {leaders.map((leader) => (
            <figure key={leader.name}>
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <Image
                  src={leader.image}
                  alt={`${leader.name}, ${leader.role}`}
                  fill
                  sizes="(min-width: 768px) 38vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              <figcaption className="border-b border-black py-5">
                <div>
                  <h3 className="text-2xl font-black tracking-[-0.035em] sm:text-3xl">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold tracking-[0.14em] text-black/50 uppercase">
                    {leader.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-8 md:pb-32">
        <div className="border-b border-black">
          <div className="grid gap-10 py-10 md:grid-cols-[1fr_0.72fr] md:items-center md:gap-16 md:py-16">
            <div>
              <p className="text-xs font-black tracking-[0.2em] uppercase">Our vision</p>
              <h2 className="mt-4 text-4xl font-black leading-[0.94] tracking-[-0.05em] sm:text-6xl">
                A light in our community.
              </h2>
              <p className="mt-7 max-w-xl text-sm leading-7 text-black/65 sm:text-base">
                We are creating a space where lives are transformed, hearts are healed, and
                everyone can discover their God-given purpose. Together, we are building a future
                filled with hope, unity, and grace.
              </p>
              <blockquote className="mt-8 border-l border-black pl-4 text-sm font-medium italic">
                “You are the light of the world. A town built on a hill cannot be hidden.”
                <cite className="mt-2 block text-[10px] font-black not-italic tracking-widest text-black/50 uppercase">
                  Matthew 5:14
                </cite>
              </blockquote>
            </div>

            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <Image
                  src="/fccbaptism.webp"
                  alt="A baptism at Faith Community Church"
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="border-t border-black pt-3 text-[10px] font-bold tracking-[0.16em] text-black/50 uppercase">
                New life in Christ
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-8 md:pb-32">
        <a
          href="https://tithe.ly/give_new/www/#/tithely/give-one-time/7549136"
          target="_blank"
          rel="noreferrer"
          className="group grid gap-8 bg-black px-6 py-10 text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:px-10 md:grid-cols-[1fr_auto] md:items-end md:py-14"
        >
          <span>
            <span className="block text-xs font-black tracking-[0.2em] text-white/60 uppercase">
              Generosity makes a difference
            </span>
            <span className="mt-4 block text-5xl font-black leading-[0.9] tracking-[-0.055em] sm:text-7xl">
              Give with purpose.
            </span>
          </span>
          <span className="flex items-center gap-3 text-xs font-black tracking-[0.16em] uppercase">
            Give online
            <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
        </a>
      </section>
    </div>
  );
}
