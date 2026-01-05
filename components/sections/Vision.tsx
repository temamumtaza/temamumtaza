"use client";

import { motion } from "framer-motion";

export function Vision() {
    return (
        <section className="py-32 px-6 bg-black min-h-[50vh] flex items-center justify-center border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-tight"
                >
                    "The future belongs to those who build it with intent. I design systems that feel inevitable."
                </motion.p>
            </div>
        </section>
    );
}
