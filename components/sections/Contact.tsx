"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin, Instagram } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-32 px-6 bg-black border-t border-white/5">
            <div className="max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60">
                        Collaboration
                    </h2>
                    <div className="text-white/50 text-xl mb-12 max-w-2xl mx-auto font-light space-y-4">
                        <p>
                            I’m open to thoughtful collaboration across technology and business.
                        </p>
                        <p>
                            This includes early-stage ideas, growing products, and long-term partnerships where technology plays a strategic role.
                        </p>
                        <p className="text-white pt-4 font-normal">
                            If you have an idea worth exploring, let’s talk.
                        </p>
                    </div>

                    <div className="flex justify-center gap-6 mb-16">
                        <a
                            href="mailto:reizants17@gmail.com"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all active:scale-[0.98] text-lg"
                        >
                            Get in touch <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="flex justify-center gap-8 text-white/40">
                        <a href="https://linkedin.com/in/temamumtaza" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                            <Linkedin className="w-5 h-5" /> <span className="hidden md:inline">LinkedIn</span>
                        </a>
                        <a href="https://instagram.com/temamumtaza" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                            <Instagram className="w-5 h-5" /> <span className="hidden md:inline">Instagram</span>
                        </a>
                        <a href="mailto:reizants17@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                            <Mail className="w-5 h-5" /> <span className="hidden md:inline">Email</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
