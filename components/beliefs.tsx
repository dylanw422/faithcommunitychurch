"use client";
import { motion } from "motion/react";
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
    title: "The Church and it's Mission",
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
    <div className="py-12 md:py-24 px-4">
      <h1 className="font-black text-xs md:text-xl text-center">OUR BELIEFS</h1>
      {beliefs.map((belief, index) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={index}
            className={`py-16 ${
              index % 2 === 1 ? "text-end" : "text-start"
            } border-b border-primary/10 last:border-none`}
          >
            <h1 className="text-3xl md:text-6xl font-semibold">{belief.title}</h1>
            <h1 className="font-light text-sm md:text-xl mt-4">{belief.description}</h1>
            <h1 className="font-light text-sm md:text-xl mt-4 italic text-primary/60">
              {belief.scripture}
            </h1>
          </motion.div>
        );
      })}
    </div>
  );
}
