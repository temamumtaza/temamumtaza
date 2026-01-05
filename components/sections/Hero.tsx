"use client";

import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white mb-6"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60">
                        Tema Mumtaza
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-white/60 mb-8 font-medium tracking-wide uppercase"
                >
                    Tech Entrepreneur · Builder · Strategic Collaborator
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed"
                >
                    I collaborate with founders and organizations to build technology-enabled businesses — from early ideas to real-world impact.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="mt-16 md:mt-24"
                >
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em]">Scroll to Explore</span>
                        <div className="w-[1px] h-16 bg-gradient-to-b from-white/10 to-transparent" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
