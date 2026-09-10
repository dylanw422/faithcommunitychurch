import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const beliefs = [
  {
    title: "Inspired Scripture",
    description: `The Scriptures, both Old and New Testaments, are verbally inspired by God and are the infallible, authoritative rule of faith and conduct.`,
    scripture: `(2 Timothy 3:15–17; 1 Thessalonians 2:13; 2 Peter 1:21)`,
  },
  {
    title: "One True God",
    description: `There is one true God—revealed in three persons: Father, Son, and Holy Spirit (commonly known as the Trinity).`,
    scripture: `(Deuteronomy 6:4; Matthew 28:19; Luke 3:22)`,
  },
  {
    title: "Deity of Jesus Christ",
    description: `Jesus Christ is the eternal Son of God, fully divine and fully human.`,
    scripture: `(Matthew 1:23; Hebrews 7:26; 1 Corinthians 15:3–4)`,
  },
  {
    title: "The Fall of Man",
    description: `Man was created good but by voluntary transgression fell, resulting in both physical and spiritual death.`,
    scripture: `(Genesis 1:26–27; Romans 5:12–19)`,
  },
  {
    title: "The Salvation of Man",
    description: `Salvation is available through Jesus Christ alone. It is received through repentance toward God and faith in Jesus.`,
    scripture: `(Luke 24:47; Ephesians 2:8; Titus 2:11; 3:5–7)`,
  },
  {
    title: "Ordinances of the Church",
    description: `There are two ordinances:
Water Baptism by immersion following salvation and
Holy Communion as a symbolic remembrance of Christ's suffering and death.`,
    scripture: `(Matthew 28:19; Romans 6:4; 1 Corinthians 11:26)`,
  },
  {
    title: "Baptism in the Holy Spirit",
    description: `All believers are entitled to the baptism in the Holy Spirit, with the initial physical evidence of speaking in tongues.`,
    scripture: `(Acts 1:4–8; 2:4; 10:44–46)`,
  },

  {
    title: "Initial Physical Evidence of Baptism in the Holy Spirit",
    description: `Speaking in tongues is the initial physical evidence of the baptism in the Holy Spirit.`,
    scripture: `(Acts 2:4; 1 Corinthians 12:4–10, 28)`,
  },
  {
    title: "Sanctification",
    description: `Sanctification is an act of separation from evil and dedication to God, accomplished through the power of the Holy Spirit.`,
    scripture: `(Romans 12:1–2; 1 Thessalonians 5:23; Hebrews 12:14)`,
  },
  {
    title: "The Church and Its Mission",
    description: `The Church is the body of Christ with a fourfold mission:
Evangelize the world,
Worship God,
Disciple believers,
Show compassion`,
    scripture: `(Ephesians 1:22–23; Matthew 28:19–20; Galatians 2:10)`,
  },
  {
    title: "The Ministry",
    description: `God calls and appoints ministers to lead the Church in its mission.`,
    scripture: `(Mark 16:15–20; Ephesians 4:11–13)`,
  },
  {
    title: "Divine Healing",
    description: `Divine healing is provided in Christ’s atonement and is available to all believers.`,
    scripture: `(Isaiah 53:4–5; Matthew 8:16–17; James 5:14–16)`,
  },
  {
    title: "The Blessed Hope",
    description: `The resurrection of the just and the rapture of believers is the imminent and blessed hope of the Church.`,
    scripture: `(1 Thessalonians 4:16–17; Titus 2:13; 1 Corinthians 15:51–52)`,
  },
  {
    title: "The Millennial Reign of Christ",
    description: `Christ will return with His saints to reign on earth for a thousand years.`,
    scripture: `(Zechariah 14:5; Revelation 20:1–6; Matthew 24:27, 30)`,
  },
  {
    title: "The Final Judgment",
    description: `The wicked dead will be raised and judged, and those whose names are not in the Book of Life will be consigned to eternal punishment.`,
    scripture: `(Matthew 25:46; Revelation 20:11–15)`,
  },
  {
    title: "The New Heavens and New Earth",
    description: `God will create a new heaven and a new earth where righteousness dwells.`,
    scripture: `(2 Peter 3:13; Revelation 21–22)`,
  },
];

export default function Beliefs() {
  return (
    <div className="bg-white text-black">
      <header className="px-4 pb-16 pt-10 sm:px-8 md:pb-24 md:pt-16">
        <div className="flex items-center justify-between border-b border-black pb-4 text-[10px] font-black tracking-[0.18em] uppercase sm:text-xs">
          <span>Faith Community Church</span>
          <span>Our foundation</span>
        </div>

        <h1 className="max-w-5xl py-10 text-[clamp(4rem,11vw,9rem)] font-black leading-[0.82] tracking-[-0.075em] sm:py-14">
          What we
          <br />
          believe.
        </h1>

        <div className="grid gap-6 border-t border-black pt-5 md:grid-cols-[1fr_1.7fr] md:items-start">
          <p className="text-xs font-black tracking-[0.18em] uppercase">Sixteen truths</p>
          <p className="max-w-2xl text-lg font-medium leading-snug tracking-[-0.02em] sm:text-2xl">
            These foundational beliefs shape our faith, our worship, and the way we live together.
          </p>
        </div>
      </header>

      <section className="px-4 pb-20 sm:px-8 md:pb-32" aria-labelledby="beliefs-heading">
        <div className="grid gap-10 md:grid-cols-[1fr_3fr] md:gap-16">
          <div>
            <p className="text-xs font-black tracking-[0.2em] uppercase">Statement of faith</p>
            <h2
              id="beliefs-heading"
              className="mt-4 text-4xl font-black leading-[0.92] tracking-[-0.05em] sm:text-5xl"
            >
              Rooted in
              <br />
              Scripture.
            </h2>
          </div>

          <ol className="border-t border-black">
            {beliefs.map((belief, index) => (
              <li key={belief.title} className="border-b border-black py-8 md:py-10">
                <article className="grid gap-5 sm:grid-cols-[2.5rem_1fr] sm:gap-6">
                  <span
                    className="text-xs font-black tracking-[0.16em] text-black/40"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-3xl font-black leading-none tracking-[-0.04em] sm:text-4xl">
                      {belief.title}
                    </h3>
                    <div className="mt-5 grid gap-4 text-sm leading-6 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
                      <p className="whitespace-pre-line">{belief.description}</p>
                      <p className="italic text-black/50">{belief.scripture}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-8 md:pb-32">
        <Link
          href="/connect"
          className="group grid gap-8 bg-black px-6 py-10 text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:px-10 md:grid-cols-[1fr_auto] md:items-end md:py-14"
        >
          <span>
            <span className="block text-xs font-black tracking-[0.2em] text-white/60 uppercase">
              Have a question?
            </span>
            <span className="mt-4 block text-5xl font-black leading-[0.9] tracking-[-0.055em] sm:text-7xl">
              Let&apos;s talk.
            </span>
          </span>
          <span className="flex items-center gap-3 text-xs font-black tracking-[0.16em] uppercase">
            Connect with us
            <ArrowUpRight
              className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </Link>
      </section>
    </div>
  );
}
