import { motion } from "motion/react";

export default function Vision() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 md:py-24 px-4"
    >
      <h1 className="font-black text-xs md:text-xl">OUR VISION</h1>
      <h1 className="font-light text-sm md:text-xl mt-4">
        We strive to be a beacon of light in our community, where individuals can experience the
        love of Christ and grow in their faith. Our vision is to create a space where lives are
        transformed, hearts are healed, and everyone can discover their God-given purpose. Together,
        we are building a future filled with hope, unity, and grace.
      </h1>
      <h1 className="font-light text-sm md:text-xl my-4 italic text-primary/60">
        &quot;You are the light of the world. A town built on a hill cannot be hidden.&quot; -
        Matthew 5:14
      </h1>
      <div className="flex w-full h-[200px] md:h-[400px]">
        <img src="./fcc7.webp" className="w-full my-4 object-cover" />
      </div>
      <div className="flex flex-col gap-4"></div>
    </motion.div>
  );
}
