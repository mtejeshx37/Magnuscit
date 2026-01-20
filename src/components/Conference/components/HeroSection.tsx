import { Sparkles, BookOpen, Trophy, ExternalLink } from 'lucide-react';

export const HeroSection = () => {
    return (
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 -z-10 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-40 translate-x-1/3"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Badge */}
                <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100">
                    <Sparkles className="w-4 h-4" />
                    <span>National Conference • February 02, 2026 • Confirmation of Paper: Jan 31, 2026 • Chennai, India</span>
                </div>

                {/* Main Heading */}
                <div className="max-w-4xl mb-8">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                        National Conference on Artificial Intelligence
                    </h1>
                    <div className="flex items-baseline gap-4 flex-wrap">
                        <h2 className="text-4xl md:text-6xl font-bold text-blue-600">
                            NCAI 2026
                        </h2>
                        <div className="h-1.5 w-24 bg-blue-600 rounded-full mt-2 hidden sm:block"></div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                    Organized by Chennai Institute of Technology, NCAI 2026 invites original research contributions addressing theoretical, experimental, and applied aspects of artificial intelligence and machine learning.
                </p>

                {/* Hybrid Mode Alert */}
                <div className="max-w-2xl mb-10 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3 text-amber-900 text-sm md:text-base leading-relaxed">
                    <span className="shrink-0 text-xl">⚠️</span>
                    <p>The conference is hybrid, paper can be presented in online or offline.
                        On Acceptance, authors will have to pay a paper fee.
                    </p>
                </div>

                {/* CTA Button */}
                <a
                    href="https://forms.gle/uUsFtAgTSwh7ALWE7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3.5 rounded-lg font-medium shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 mb-20"
                >
                    Submit Your Paper
                </a>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <HighlightCard
                        icon={<ExternalLink className="w-6 h-6 text-gray-400" />}
                        title="Peer-Reviewed"
                        description="Double-blind review process by expert researchers"
                        customIcon={undefined}
                    />
                    <HighlightCard
                        icon={<BookOpen className="w-6 h-6 text-green-600" />}
                        title="Publication"
                        description="Indexed proceedings in major databases"
                        customIcon="📚"
                    />
                    <HighlightCard
                        icon={<Trophy className="w-6 h-6 text-yellow-600" />}
                        title="Best Paper Awards"
                        description="Recognition for outstanding contributions"
                        customIcon="🏆"
                    />
                </div>
            </div>
        </section>
    );
};

// Helper Card Component
const HighlightCard = ({ icon, title, description, customIcon }: { icon?: React.ReactNode, title: string, description: string, customIcon?: string }) => {
    return (
        <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mb-4 flex items-center justify-center text-3xl bg-gray-50 rounded-lg">
                {customIcon ? customIcon : icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
    );
};
