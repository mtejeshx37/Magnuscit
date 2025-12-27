import citLogo from '../../../assets/logos/cit-logo.png';
import magnusLogo from '../../../assets/logos/magnus-new.jpg';

export const Navbar = () => {
    const navItems = [
        { label: 'Home', href: '#' },
        { label: 'Call for Papers', href: '#call-for-papers' },
        { label: 'Topics', href: '#topics' },
        { label: 'Important Dates', href: '#dates' },
        { label: 'Venue', href: '#venue' },
        { label: 'Committee', href: '#committee' },
        { label: 'Contact Us', href: '#contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="w-full px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-4 shrink-0">
                    <img
                        src={citLogo}
                        alt="CIT Logo"
                        className="h-12 w-auto object-contain"
                    />
                    <img
                        src={magnusLogo}
                        alt="Magnus Logo"
                        className="h-12 w-auto object-contain"
                    />
                    <span className="text-sky-500 font-bold text-xl hidden sm:block font-[Space_Grotesk]">NCAI 2026</span>
                </div>

                <div className="hidden lg:flex items-center justify-center flex-1 gap-8 px-8">
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
                <button className="lg:hidden p-2 text-gray-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </button>
            </div>
        </nav>
    );
};
