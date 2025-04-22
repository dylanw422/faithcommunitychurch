import { motion } from "motion/react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="py-12"
    >
      <div className="flex w-full justify-evenly py-12 text-sm md:text-xl font-bold">
        <h1>LAKE CHARLES, LA</h1>
        <h1>SUNDAYS AT 5:00 PM</h1>
      </div>
      <div
        className={`text-[60px] sm:text-[90px] md:text-[120px] lg:text-[150px] xl:text-[180px] ${roboto.className} font-black leading-none text-center flex flex-col items-center justify-center`}
      >
        <h1>FAITH</h1>
        <h1>COMMUNITY</h1>
        <h1>CHURCH</h1>
      </div>
      <div className="py-12 px-8 text-sm md:text-xl px-4 italic font-light">
        <h1>
          &quot;But if we walk in the light, as he is in the light, we have fellowship with one
          another, and the blood of Jesus, his Son, purifies us from all sin.&quot; - 1 John 1:7
        </h1>
      </div>
    </motion.div>
  );
}
