import { motion } from 'motion/react';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export function ConferenceDetail() {
    const navigate = useNavigate();

    const conferenceData = {
        title: 'CONFERENCE',
        category: 'ACADEMIC',
        description: 'A national academic conference bringing together researchers, scholars, and industry professionals to present cutting-edge research papers, engage in collaborative discussions, and explore emerging technologies shaping the future of computer science and engineering.',

        // Updated dates
        dates: [
            { label: 'Paper Submission', date: 'Jan 20th, 2026', icon: FileText },
            { label: 'Conference Date', date: 'Feb 02nd, 2026', icon: Calendar }
        ],

        submissionGuidelines: [
            'Original research papers (6-8 pages)',
            'Extended abstracts (2-4 pages)',
            'Workshop proposals',
            'Tutorial submissions',
            'Industry case studies'
        ],

        registrationRules: [
            'Open to researchers, faculty, and industry professionals.',
            'Students must provide valid student ID for discounted rates.',
            'At least one author must register to present the paper.'
        ],

        contact: 'Conference Chair: Dr. Rajesh Kumar | Email: conference@magnus2k26.edu',
        conferenceWebsite: 'https://magnus2k26.edu/conference',
        registrationLink: 'https://magnus2k26.edu/conference/register'
    };

    return (
        <>
            <div className="h-screen w-full bg-[#050505] text-white overflow-hidden flex flex-col">
                {/* Top Bar - Back Button */}
                <div className="shrink-0 container mx-auto px-4 py-6">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#BD00FF]/20 border border-white/10 hover:border-[#BD00FF] rounded transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-sm">Back to Events</span>
                    </motion.button>
                </div>

                {/* Header */}
                <div className="shrink-0 container mx-auto px-4 mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-end justify-between gap-4 border-b border-white/10 pb-6"
                    >
                        <div>
                            <h1
                                className="text-5xl md:text-7xl mb-2 text-[#BD00FF] leading-none"
                                style={{ fontFamily: 'VT323, monospace' }}
                            >
                                {conferenceData.title}
                            </h1>
                            <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                                {conferenceData.description}
                            </p>
                        </div>
                        <div className="hidden md:block px-6 py-2 bg-[#BD00FF]/10 border border-[#BD00FF] rounded-lg">
                            <span className="text-[#BD00FF] font-mono text-sm tracking-wider">
                                {conferenceData.category}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content - 2 Column Layout */}
                <div className="flex-1 min-h-0 container mx-auto px-4 grid md:grid-cols-2 gap-6 items-stretch pb-12 overflow-y-auto custom-scrollbar">

                    {/* Left Column: Dates, Registration & Contact Stacked */}
                    <div className="space-y-6">

                        {/* Important Dates */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {conferenceData.dates.map((item, index) => (
                                <div key={index} className="p-4 bg-[#0A0A0A] border border-[#BD00FF]/20 rounded-xl flex flex-col items-center text-center group hover:border-[#BD00FF]/50 transition-colors">
                                    <item.icon className="w-6 h-6 text-[#BD00FF] mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">{item.label}</span>
                                    <span className="text-white font-mono text-lg font-bold">{item.date}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Registration Rules */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col p-6 bg-[#0A0A0A] border border-[#BD00FF]/20 rounded-xl"
                        >
                            <h3 className="text-2xl mb-4 text-[#BD00FF] shrink-0" style={{ fontFamily: 'VT323, monospace' }}>
                                REGISTRATION
                            </h3>
                            <ul className="space-y-3">
                                {conferenceData.registrationRules.map((rule, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-[#BD00FF] mt-1 text-xs">▸</span>
                                        <span className="text-gray-300 text-sm leading-relaxed">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col p-6 bg-[#0A0A0A] border border-[#BD00FF]/20 rounded-xl"
                        >
                            <h3 className="text-2xl mb-4 text-[#BD00FF] shrink-0" style={{ fontFamily: 'VT323, monospace' }}>
                                CONTACT
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-white/5 rounded border border-[#BD00FF]/10 hover:border-[#BD00FF]/30 transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-white font-semibold text-sm">Charan Selva Dhanush</p>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-1">Organizing Committee</p>
                                    <a href="tel:+919962524758" className="text-[#BD00FF] hover:underline font-mono text-sm block">
                                        +91 99625 24758
                                    </a>
                                </div>

                                <div className="p-3 bg-white/5 rounded border border-[#BD00FF]/10 hover:border-[#BD00FF]/30 transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-white font-semibold text-sm">Varshha</p>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-1">Organizing Committee</p>
                                    <a href="tel:+918939777852" className="text-[#BD00FF] hover:underline font-mono text-sm block">
                                        +91 89397 77852
                                    </a>
                                </div>

                                <div className="p-3 bg-white/5 rounded border border-[#BD00FF]/10 hover:border-[#BD00FF]/30 transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-white font-semibold text-sm">Latheesh Saran</p>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-1">Organizing Committee</p>
                                    <a href="tel:+916382235520" className="text-[#BD00FF] hover:underline font-mono text-sm block">
                                        +91 6382235520
                                    </a>
                                </div>

                                <div className="p-3 bg-white/5 rounded border border-[#BD00FF]/10 hover:border-[#BD00FF]/30 transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-white font-semibold text-sm">Swetha</p>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-1">Organizing Committee</p>
                                    <a href="tel:+917397444395" className="text-[#BD00FF] hover:underline font-mono text-sm block">
                                        +91 73974 44395
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Register CTA (Centered Vertically) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col justify-center h-full pb-24"
                    >
                        <div className="flex flex-col items-center text-center relative z-10 w-full">
                            <h3 className="text-4xl mb-8 text-white" style={{ fontFamily: 'VT323, monospace' }}>
                                READY TO JOIN?
                            </h3>

                            <div className="mb-10">
                                <p className="text-white font-mono text-lg">
                                    Have queries? <br />
                                    <span className="text-[#BD00FF] font-bold">Click Register</span>
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    navigate('/conference-website');
                                    window.scrollTo(0, 0);
                                }}
                                className="w-full py-5 bg-[#BD00FF] hover:bg-[#A000Dbe] text-white font-mono text-xl tracking-wider rounded-lg transition-all duration-300 shadow-lg shadow-[#BD00FF]/50 cursor-pointer transform hover:scale-[1.02]"
                            >
                                REGISTER
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Scrollbar Styles */}
                <style>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.02);
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(189, 0, 255, 0.3);
                        border-radius: 2px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(189, 0, 255, 0.5);
                    }
                `}</style>
            </div>
        </>
    );
}
