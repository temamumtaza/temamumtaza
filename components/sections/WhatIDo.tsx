"use client";

import { motion } from "framer-motion";
import { Compass, Cpu, Handshake } from "lucide-react";

/**
 * Updated "What I Do" section focusing on Business Value.
 * 1. Strategy & Business
 * 2. Technology & Product
 * 3. Collaboration & Execution
 */

const capabilities = [
    {
        icon: Compass,
        title: "Strategy & Business",
        description: "I help shape ideas into viable business directions. From early-stage concepts to scalable strategies, I work closely with partners to clarify vision, validate direction, and define what actually matters."
    },
    {
        icon: Cpu,
        title: "Technology & Product",
        description: "I build and guide technology as a business asset — not just software. This includes product architecture, AI-driven solutions, and systems designed to grow alongside the business."
    },
    {
        icon: Handshake,
        title: "Collaboration & Execution",
        description: "I collaborate across technical and non-technical teams. Whether you're a founder, operator, or creative partner, I help bridge gaps between ideas, execution, and outcomes."
    }
];

export function WhatIDo() {
    return (
        <section id="work" className="py-32 px-6 bg-black">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60">What I Do</h2>
                    <div className="h-[1px] w-24 bg-white/20" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {capabilities.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group"
                        >
                            <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors">
                                <item.icon className="text-white/80 w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">{item.title}</h3>
                            <p className="text-white/60 leading-relaxed font-light text-[15px]">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
