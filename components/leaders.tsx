import { motion } from "motion/react";

const leaders = [
  {
    img: "./fcc1.webp",
    name: "Melvin Stringfield",
    title: "Lead Pastor",
    description: "Lead Pastor of Faith Community Church",
  },
  {
    img: "./fcc5.webp",
    name: "Ariel Stringfield",
    title: "Lead Pastor",
    description: "Lead Pastor of Faith Community Church",
  },
];
export default function Leaders() {
  return (
    <div className="py-12 md:py-24 px-4">
      <h1 className="font-black text-xs md:text-xl">OUR LEADERS</h1>
      <div className="flex flex-grid grid-cols-2 justify-center gap-12 py-12">
        {leaders.map((leader, index) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              key={index}
              className="flex flex-col items-center w-1/3"
            >
              <img src={leader.img} className="w-[150px] md:w-[350px]" />
              <h1 className="text-2xl md:text-3xl font-semibold mt-4">{leader.name}</h1>
              <h1 className="text-base mt-2 md:text-xl">{leader.title}</h1>
              <h1 className="text-xs font-light md:text-base">{leader.description}</h1>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
