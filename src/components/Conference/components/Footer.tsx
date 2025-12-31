import citLogo from '../../../assets/logos/cit-logo.png';

export const Footer = () => {
    return (
        <footer id="contact" className="bg-white border-t border-gray-100 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-4">
                        <img
                            src={citLogo}
                            alt="CIT Logo"
                            className="h-14 w-auto object-contain"
                        />
                        <div>
                            <p className="font-semibold text-gray-900">National Conference on Artificial Intelligence 2026</p>
                            <p className="text-gray-500 text-sm mt-1">Organized by Chennai Institute of Technology</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-gray-500 text-sm cursor-default">Privacy Policy</span>
                        <span className="text-gray-500 text-sm cursor-default">Terms of Service</span>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
                    &copy; 2026 NCAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
