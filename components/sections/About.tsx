"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="py-32 px-6 bg-zinc-950">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/50 to-white/30">About</h2>
                    <div className="space-y-10 text-xl md:text-2xl text-white/60 font-light leading-relaxed">
                        <p>
                            I see technology as a <span className="text-white font-normal">means</span>, not the outcome.
                        </p>
                        <p>
                            My work sits at the intersection of business thinking and technical execution.
                            I’ve worked on turning abstract ideas into real products, platforms, and systems — collaborating with founders, operators, and teams along the way.
                        </p>
                        <p>
                            My focus is always the same: <span className="text-white font-normal">clarity, leverage, and long-term value</span>.
                            Good technology should support the business, not complicate it.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
