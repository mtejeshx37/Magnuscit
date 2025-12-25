import { FileText, Users, Trophy } from 'lucide-react';

export const CallForPapersSection = () => {
    return (
        <section id="call-for-papers" className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Call for Papers</h2>

            <p className="text-gray-600 mb-12 max-w-4xl text-lg">
                NCAI 2026 invites submissions of original research and applications in all areas of Artificial Intelligence. We welcome both theoretical and applied work, including but not limited to machine learning, natural language processing, computer vision, robotics, and AI ethics.
            </p>

            {/* Submission Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <PaperTypeCard
                    icon={<FileText className="w-6 h-6 text-blue-600" />}
                    title="Full Papers"
                    subtitle="8-10 pages"
                    description="Original research contributions with substantial experimental validation"
                />
                <PaperTypeCard
                    icon={<FileText className="w-6 h-6 text-blue-600" />}
                    title="Short Papers"
                    subtitle="4-6 pages"
                    description="Work in progress, novel ideas, or focused contributions"
                />
                <PaperTypeCard
                    icon={<Users className="w-6 h-6 text-blue-600" />}
                    title="Posters"
                    subtitle="2 pages"
                    description="Demonstrations, preliminary results, or position papers"
                />
            </div>

            {/* Review Process */}
            <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Review Process</h3>
                <p className="text-gray-600 leading-relaxed">
                    All submissions will undergo a rigorous <span className="font-semibold text-gray-900">double-blind peer review</span> process. Each paper will be reviewed by at least three members of the program committee. Authors must ensure their submissions are anonymized and do not include identifying information.
                </p>
            </div>

            {/* Publication */}
            <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Publication & Presentation</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                    Accepted papers will be published in the conference proceedings and will be indexed in major databases. Selected high-quality papers will be recommended for publication in the following prestigious journals:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        "Engineering Applications of Artificial Intelligence",
                        "Artificial Intelligence",
                        "Knowledge-Based Systems"
                    ].map((journal, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start border-t-4 border-t-indigo-500">
                            <div className="p-2 bg-indigo-50 rounded-lg mb-4">
                                <FileText className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg leading-tight">{journal}</h4>
                        </div>
                    ))}
                </div>

                <p className="text-gray-600 leading-relaxed">
                    At least one author of each accepted paper must register and present the work at the conference.
                </p>
            </div>

            {/* Awards Banner */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-8 rounded-r-lg flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Best Paper Awards</h4>
                    <p className="text-gray-600 leading-relaxed">
                        Outstanding submissions will be selected for <span className="font-medium text-gray-900">Best Paper</span>, <span className="font-medium text-gray-900">Best Student Paper</span>, and <span className="font-medium text-gray-900">Best Application Paper</span> awards, with certificates and prizes.
                    </p>
                </div>
            </div>
        </section>
    );
};

const PaperTypeCard = ({ icon, title, subtitle, description }: { icon: React.ReactNode, title: string, subtitle: string, description: string }) => {
    return (
        <div className="bg-white p-8 rounded-xl border-t-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow border-x border-b border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                {subtitle}
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
    );
};
