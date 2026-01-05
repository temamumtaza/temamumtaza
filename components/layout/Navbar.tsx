"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "Work", href: "/#work" },
    { name: "Explore", href: "/#playground" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Desktop Navbar (Pill Design) */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 items-center justify-center pointer-events-none"
            >
                <div className="pointer-events-auto bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 flex items-center gap-6 shadow-2xl mt-6">
                    <Link
                        href="/"
                        className="text-sm font-medium text-white/90 hover:text-white transition-colors tracking-tight mr-4 p-2"
                    >
                        Tema Mumtaza
                    </Link>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <div className="flex items-center gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "relative text-[13px] font-medium transition-colors duration-300 px-3 py-1.5 rounded-full",
                                    pathname === item.href ? "text-white" : "text-white/60 hover:text-white"
                                )}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-white/10 rounded-full"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Navbar */}
            <nav className="md:hidden fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pointer-events-auto bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 flex items-center justify-between w-full max-w-sm shadow-lg"
                >
                    <Link
                        href="/"
                        className="text-sm font-medium text-white/90"
                        onClick={() => setIsOpen(false)}
                    >
                        Tema Mumtaza
                    </Link>

                    <button
                        onClick={toggleMenu}
                        className="text-white/90 hover:text-white transition-colors p-1"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </motion.div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-light text-white/80 hover:text-white transition-colors block p-2"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
