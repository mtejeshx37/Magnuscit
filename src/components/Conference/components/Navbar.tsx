
export const Navbar = () => {
    const navItems = [
        { label: 'Home', href: '#' },
        { label: 'Call for Papers', href: '#call-for-papers' },
        { label: 'Topics', href: '#topics' },
        { label: 'Submission', href: '#submission' },
        { label: 'Important Dates', href: '#dates' },
        { label: 'Venue', href: '#venue' },
        { label: 'Committee', href: '#committee' },
        { label: 'Contact Us', href: '#contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src="/assets/logos/cit-logo.png"
                        alt="CIT Logo"
                        className="h-12 w-auto object-contain"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Chennai_Institute_of_Technology_logo.png/1200px-Chennai_Institute_of_Technology_logo.png';
                        }}
                    />
                    <div className="h-8 w-px bg-gray-300 mx-2 hidden sm:block"></div>
                    <span className="text-blue-600 font-bold text-lg hidden sm:block">NCAI 2026</span>
                </div>

                <div className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Mobile menu button placeholder */}
                <button className="lg:hidden p-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </button>
            </div>
        </nav>
    );
};
