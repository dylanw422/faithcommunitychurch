import { motion } from "motion/react";

const details = [
  {
    title: "FIND FAITH.",
    scripture: "So faith comes from hearing, and hearing through the word of Christ",
    description:
      "Discover a deeper connection with God through meaningful worship, powerful teachings, and a community that embraces your spiritual journey. Let faith be the foundation that transforms your life.",
  },
  {
    title: "FIND FAMILY.",
    scripture: "For where two or three are gathered in my name, there am I among them",
    description:
      "At our church, you’re not just a member; you’re part of a loving and supportive family. Experience genuine relationships that inspire, uplift, and encourage you every step of the way.",
  },
  {
    title: "FIND FREEDOM.",
    scripture: "So if the Son sets you free, you will be free indeed",
    description:
      "Break free from the burdens of the past and step into the life God has designed for you. Through Christ, you can find true freedom, peace, and healing for your soul.",
  },
  {
    title: "FULFILL PURPOSE.",
    scripture:
      "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them",
    description:
      "You were created with a purpose, and we’re here to help you discover it. Live a life of significance, empowered by faith, as you step into the calling God has for you.",
  },
];

export default function Mission() {
  return (
    <div className="py-12 md:py-24 px-4">
      <h1 className="font-black text-xs md:text-xl">OUR MISSION</h1>
      {details.map((detail, index) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={index}
            className="py-4"
          >
            <h1 className="text-3xl md:text-6xl font-semibold">{detail.title}</h1>
            <h1 className="font-light text-sm md:text-xl mt-4">{detail.description}</h1>
            <h1 className="font-light text-sm md:text-xl italic mt-4 text-primary/60">
              &quot;{detail.scripture}&quot;
            </h1>
          </motion.div>
        );
      })}
    </div>
  );
}
