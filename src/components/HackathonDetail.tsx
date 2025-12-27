import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CustomCursor } from './CustomCursor';
import { MatrixLoader } from './MatrixLoader';

export function HackathonDetail() {
    const navigate = useNavigate();

    const hackathonData = {
        title: 'HACKATHON',
        category: 'COMPETITION',
        description: 'A 24-hour coding marathon where teams collaborate to build innovative solutions to real-world problems. Compete for prizes, network with industry professionals, and showcase your technical prowess in this high-energy event.',

        rounds: [
            {
                title: 'Round 1: Ideation & Team Formation',
                description: 'Teams pitch their innovative ideas and form collaborative groups. Participants present problem statements and proposed solutions to judges and mentors for initial feedback.'
            },
            {
                title: 'Round 2: Development Sprint',
                description: 'Teams have 20 hours to build their solutions from scratch. Access to mentors, APIs, cloud resources, and development tools. Regular check-ins to track progress and provide guidance.'
            },
            {
                title: 'Round 3: Final Presentation',
                description: 'Teams present their working prototypes to a panel of industry experts. Demonstrations must include live demos, technical architecture explanations, and business viability discussions.'
            },
            {
                title: 'Round 4: Winner Selection',
                description: 'Final judging based on innovation, technical implementation, user experience, scalability, and presentation quality. Winners announced with prizes and internship opportunities.'
            }
        ],

        judgingCriteria: [
            'Innovation & creativity',
            'Technical implementation quality',
            'User experience & design',
            'Scalability & architecture',
            'Business viability',
            'Presentation & communication'
        ],

        registrationRules: [
            'Only college students are permitted to participate.',
            'A valid college ID is mandatory.',
            'Teams must consist of 2-4 members.',
            'Participants must wear the registration badge throughout the event.',
            'Prior registration is mandatory, either online or on-spot.',
            'Re-entry is not allowed, and the fee paid is non-refundable.'
        ],

        eventRules: [
            'All code must be written during the hackathon timeframe.',
            'Use of pre-existing code libraries and frameworks is allowed.',
            'Internet access and AI tools are permitted.',
            'Teams must submit their code repository and presentation.',
            'Plagiarism or copying will result in immediate disqualification.',
            'Judges\' decision is final and binding.'
        ],

        contact: 'Latheesh Saran: +916382235520',
        registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSc_hackathon_registration/viewform'
    };

    return (
        <>
            <MatrixLoader />
            <CustomCursor />
            <div className="min-h-screen bg-[#050505] text-white">
                {/* Back Button */}
                <div className="container mx-auto px-4 py-6">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#00D1FF]/20 border border-white/10 hover:border-[#00D1FF] rounded transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-mono text-sm">Back to Events</span>
                    </motion.button>
                </div>

                {/* Header */}
                <div className="container mx-auto px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start justify-between flex-wrap gap-4"
                    >
                        <div>
                            <h1
                                className="text-6xl md:text-8xl mb-4 text-[#00D1FF]"
                                style={{ fontFamily: 'VT323, monospace' }}
                            >
                                {hackathonData.title}
                            </h1>
                            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                                {hackathonData.description}
                            </p>
                        </div>
                        <div className="px-6 py-3 bg-[#00D1FF]/10 border border-[#00D1FF] rounded-lg">
                            <span className="text-[#00D1FF] font-mono text-sm tracking-wider">
                                {hackathonData.category}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Rounds Section */}
                <div className="container mx-auto px-4 py-12">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl md:text-4xl mb-8 text-white"
                        style={{ fontFamily: 'VT323, monospace' }}
                    >
                        EVENT STRUCTURE
                    </motion.h2>
                    <div className="space-y-6">
                        {hackathonData.rounds.map((round, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-white/5 border border-[#00D1FF]/20 rounded-lg hover:border-[#00D1FF]/50 transition-all duration-300"
                            >
                                <h3 className="text-xl text-[#00D1FF] mb-2 font-mono">{round.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{round.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Judging Criteria */}
                <div className="container mx-auto px-4 py-12">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl md:text-4xl mb-8 text-white"
                        style={{ fontFamily: 'VT323, monospace' }}
                    >
                        JUDGING CRITERIA
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {hackathonData.judgingCriteria.map((criteria, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-4 bg-white/5 border border-[#00D1FF]/20 rounded-lg"
                            >
                                <p className="text-gray-300 font-mono text-sm">• {criteria}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Rules Section */}
                <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
                    {/* Registration Rules */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 bg-[#0A0A0A] border border-[#00D1FF]/20 rounded-xl"
                    >
                        <h3
                            className="text-2xl md:text-3xl mb-6 text-[#00D1FF]"
                            style={{ fontFamily: 'VT323, monospace' }}
                        >
                            REGISTRATION
                        </h3>
                        <ul className="space-y-3">
                            {hackathonData.registrationRules.map((rule, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-[#00D1FF] mt-1">▸</span>
                                    <span className="text-gray-400 text-sm leading-relaxed">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Event Rules */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 bg-[#0A0A0A] border border-[#00D1FF]/20 rounded-xl"
                    >
                        <h3
                            className="text-2xl md:text-3xl mb-6 text-[#00D1FF]"
                            style={{ fontFamily: 'VT323, monospace' }}
                        >
                            RULES
                        </h3>
                        <ul className="space-y-3">
                            {hackathonData.eventRules.map((rule, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-[#00D1FF] mt-1">▸</span>
                                    <span className="text-gray-400 text-sm leading-relaxed">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Contact & Registration */}
                <div className="container mx-auto px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 bg-[#0A0A0A] border border-[#00D1FF]/20 rounded-xl"
                    >
                        <h3
                            className="text-2xl md:text-3xl mb-6 text-[#00D1FF]"
                            style={{ fontFamily: 'VT323, monospace' }}
                        >
                            CONTACT US!!
                        </h3>
                        <p className="text-gray-300 mb-8 font-mono">
                            <span className="text-[#00D1FF]">▸</span> {hackathonData.contact}
                        </p>
                        <a
                            href={hackathonData.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 bg-[#00D1FF] hover:bg-[#00D1FF]/80 text-black font-mono text-lg tracking-wider rounded-lg transition-all duration-300 shadow-lg shadow-[#00D1FF]/50"
                        >
                            REGISTER NOW
                        </a>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
