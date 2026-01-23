import { FileText } from 'lucide-react';

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
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Publications</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                    Accepted papers will be published in the conference proceedings and will be indexed in major databases. Selected high-quality papers will be recommended for publication in the following:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Elsevier Card */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-indigo-500 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <FileText className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-2xl">Elsevier</h4>
                        </div>

                        <ul className="space-y-4 mb-6 flex-1">
                            {[
                                { title: "Artificial Intelligence", issn: "0004-3702" },
                                { title: "Engineering Applications of Artificial Intelligence", issn: "0952-1976" },
                                { title: "AI Open", issn: "2666-6510" },
                                { title: "Knowledge-Based Systems", issn: "0950-7051" }
                            ].map((journal, idx) => (
                                <li key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                    <p className="font-semibold text-gray-800 text-base leading-tight mb-1">{journal.title}</p>
                                    <p className="text-xs text-indigo-600 font-mono font-medium">ISSN: {journal.issn}</p>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto bg-amber-50 text-amber-900 p-3 rounded-lg text-sm font-medium border border-amber-100 flex items-start gap-2">
                            <span className="text-amber-600 text-lg">★</span>
                            <span className="mt-0.5">Amount: Rs.14,000 (only for top 5 papers)</span>
                        </div>
                    </div>

                    {/* Elsevier (Mendeley) Card */}
                    {/* <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-indigo-500 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <FileText className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-2xl">IJSDR'S</h4>
                        </div>

                        <ul className="space-y-4 mb-6 flex-1">
                            {[
                                { title: "International Journal of Scientific Development and Research", issn: "ISSN: 2455-2631" },
                                // { title: "International Research Journal of Computer Science", issn: "ISSN: 2349-9842" },
                                // { title: "International Journal Innovative Research In Information Security", issn: "P-ISSN: 2349-7009 / E-ISSN: 2349-701" }
                            ].map((journal, idx) => (
                                <li key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                    <p className="font-semibold text-gray-800 text-base leading-tight mb-1">{journal.title}</p>
                                    <p className="text-xs text-indigo-600 font-mono font-medium">{journal.issn}</p>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto bg-amber-50 text-amber-900 p-3 rounded-lg text-sm font-medium border border-amber-100 flex items-start gap-2">
                            <span className="text-amber-600 text-lg">★</span>
                            <span className="mt-0.5">Cost will be 2.5k</span>
                        </div>
                    </div> */}

                    {/* International Journals Card */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-indigo-500 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <FileText className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-2xl">UGC</h4>
                        </div>

                        <ul className="space-y-4 mb-6 flex-1">
                            {/* <li className="border-b border-gray-100 pb-3">
                                <p className="font-semibold text-gray-800 text-base leading-tight mb-1">Journal of Artificial Intelligence Research (JAIR)</p>
                                <p className="text-xs text-indigo-600 font-mono font-medium">ISSN: 1076-9757</p>
                                <p className="text-xs text-gray-500 mt-1">Publisher: AI Access Foundation</p>
                            </li> */}
                            <li className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                <p className="font-semibold text-gray-800 text-base leading-tight mb-1">International Journal of Scientific Development</p>
                                <p className="text-xs text-indigo-600 font-mono font-medium">ISSN: 2455-2631</p>
                                <br />
                                <p className="text-xs text-gray-600 font-mono font-medium"><strong>Impact factor 9.15 (Calculate by google scholar and Semantic Scholar | AI-Powered Research Tool)</strong>
                                    <br />
                                    <br />
                                    <strong>ESTD Year: 2016</strong>
                                </p>
                            </li>

                        </ul>
                        <div className="mt-auto bg-amber-50 text-amber-900 p-3 rounded-lg text-sm font-medium border border-amber-100 flex items-start gap-2">
                            <span className="text-amber-600 text-lg">★</span>
                            <span className="mt-0.5">Amount: Rs. 1,750</span>
                        </div>
                    </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                    The conference is hybrid, paper can be presented online or offline.
                </p>
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
