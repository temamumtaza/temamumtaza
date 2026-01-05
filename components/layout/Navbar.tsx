"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    { name: "Work", href: "/#work" },
    { name: "Explore", href: "/#playground" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-center pointer-events-none"
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
    );
}
