
export const Footer = () => {
    return (
        <footer id="contact" className="bg-white border-t border-gray-100 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="font-semibold text-gray-900">National Conference on Artificial Intelligence 2026</p>
                    <p className="text-gray-500 text-sm mt-1">Organized by Chennai Institute of Technology</p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Privacy Policy</a>
                    <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Terms of Service</a>
                    <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">Contact Support</a>
                </div>

                <div className="text-gray-400 text-sm">
                    &copy; 2026 NCAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
