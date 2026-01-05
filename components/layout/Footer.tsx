export function Footer() {
    return (
        <footer className="w-full py-12 border-t border-white/5 bg-black text-white/40 text-sm">
            <div className="container max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Tema Mumtaza. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white/80 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white/80 transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white/80 transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
