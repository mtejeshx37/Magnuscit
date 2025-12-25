import { PenTool, FileText, Upload, CheckCircle2, AlertCircle, Download } from 'lucide-react';

export const SubmissionSection = () => {
    return (
        <section id="submission" className="py-20 px-6 max-w-7xl mx-auto">
            {/* Visual Process Steps */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Submission Process</h2>
                <p className="text-gray-600 mb-12">Follow these simple steps to submit your research paper to NCAI 2026</p>

                <div className="relative flex flex-col md:flex-row justify-between max-w-4xl mx-auto items-center gap-8 md:gap-0">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-[28px] left-0 w-full h-[2px] bg-blue-100 z-0"></div>

                    <ProcessStep
                        number="1"
                        icon={<PenTool className="w-8 h-8 text-white" />}
                        title="Prepare"
                        description="Write your paper following IEEE format and anonymization guidelines"
                    />
                    <ProcessStep
                        number="2"
                        icon={<FileText className="w-8 h-8 text-white" />}
                        title="Details"
                        description="Fill in paper information, abstract, keywords, and author details"
                    />
                    <ProcessStep
                        number="3"
                        icon={<Upload className="w-8 h-8 text-white" />}
                        title="Upload"
                        description="Submit your manuscript and supplementary materials via our portal"
                    />
                </div>

                <div className="mt-12">
                    <a
                        href="https://forms.gle/uUsFtAgTSwh7ALWE7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                    >
                        Start Your Submission
                    </a>
                </div>
            </div>

            {/* Guidelines Grid */}
            <div className="mb-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-8">Submission Guidelines</h3>
                <p className="text-gray-600 mb-8">Please carefully review the following guidelines before submitting your paper.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GuidelineCard
                        title="Formatting"
                        items={[
                            "Use the IEEE conference template (two-column format)",
                            "Full papers: 8-10 pages including references",
                            "Short papers: 4-6 pages including references",
                            "Posters: 2 pages including references"
                        ]}
                    />
                    <GuidelineCard
                        title="Anonymization"
                        items={[
                            "Remove all author names and affiliations from the submission",
                            "Avoid self-citations that reveal identity",
                            "Anonymize acknowledgments and funding sources",
                            "Remove identifying information from figures and tables"
                        ]}
                    />
                    <GuidelineCard
                        title="Submission Requirements"
                        items={[
                            "Papers must be in PDF format",
                            "Maximum file size: 10 MB",
                            "Submit via our online portal only",
                            "English language only",
                            "Original work not published or under review elsewhere"
                        ]}
                    />
                    <GuidelineCard
                        title="Supplementary Material"
                        items={[
                            "Optional supplementary materials (code, datasets, appendices)",
                            "Must be anonymized",
                            "Submit as a single ZIP file (max 50 MB)",
                            "Reviewers are not required to view supplementary materials"
                        ]}
                    />
                </div>
            </div>

            {/* Important Notice */}
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg flex items-start gap-4 mb-20">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Important Notice</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        All submissions must be original work that has not been published elsewhere and is not currently under review at another conference or journal. Submissions that violate double-blind reviewing requirements or formatting guidelines will be desk-rejected without review.
                    </p>
                </div>
            </div>

            {/* CTA Footer */}
            <div className="bg-[#1a365d] rounded-2xl p-10 md:p-14 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Submit?</h3>
                <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                    Download the paper template and access the submission system
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://attend.ieee.org/procomm-2024/wp-content/uploads/sites/580/2024/03/Full-Paper-template.docx&ved=2ahUKEwi2uqK01NiRAxUsxTgGHVJgIxMQFnoECD4QAQ&usg=AOvVaw0-t0v0SBGwFaJW6Tj5zX3L"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white text-[#1a365d] px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download IEEE Template
                    </a>
                    <a
                        href="https://forms.gle/uUsFtAgTSwh7ALWE7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium shadow-lg transition-colors"
                    >
                        Submit Paper
                    </a>
                </div>
            </div>
        </section>
    );
};

const ProcessStep = ({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) => {
    return (
        <div className="relative z-10 flex flex-col items-center max-w-xs text-center">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 relative">
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-xs font-bold text-blue-600">
                    {number}
                </div>
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed px-4">{description}</p>
        </div>
    );
};

const GuidelineCard = ({ title, items }: { title: string, items: string[] }) => {
    return (
        <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <FileText className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">{title}</h4>
            </div>
            <ul className="space-y-3">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
