import { motion } from "motion/react";

export default function Community() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 md:py-24 px-4"
    >
      <h1 className="font-black text-xs md:text-xl">OUR COMMUNITY</h1>
      <h1 className="font-light text-sm md:text-xl my-4">
        We exist to inspire people to live faith-filled lives rooted in the love of Christ. Our goal
        is to help individuals find belonging in a supportive community where they can grow and
        thrive together.
      </h1>
      <div className="flex w-full h-[200px] md:h-[400px]">
        <img src="./fcc4.webp" className="w-full py-4 object-cover" />
      </div>
    </motion.div>
  );
}
