import { motion } from "motion/react";
import { Button } from "./ui/button";

export default function Tithe() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 md:py-24 px-4"
    >
      <h1 className="font-black text-xs md:text-xl">TITHE</h1>
      <h1 className="font-light text-sm md:text-xl mt-4">
        If you feel led to give, know that your contributions help support our ministry, outreach
        programs, and the ongoing work of the church. Every gift, no matter the size, makes a
        meaningful impact.
      </h1>
      <Button
        onClick={() => window.open("https://tithe.ly/give_new/www/#/tithely/give-one-time/7549136")}
        className="w-full rounded-none mt-4 bg-green-400 hover:bg-green-400/70 transition-all text-black font-semibold"
      >
        GIVE HERE
      </Button>
    </motion.div>
  );
}
