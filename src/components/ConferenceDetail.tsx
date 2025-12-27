import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CustomCursor } from './CustomCursor';
import { MatrixLoader } from './MatrixLoader';

export function ConferenceDetail() {
    const navigate = useNavigate();

    const conferenceData = {
        title: 'CONFERENCE',
        category: 'ACADEMIC',
        description: 'An international academic conference bringing together researchers, scholars, and industry professionals to present cutting-edge research papers, engage in collaborative discussions, and explore emerging technologies shaping the future of computer science and engineering.',

        tracks: [
            {
                title: 'Track 1: Artificial Intelligence & Machine Learning',
                description: 'Papers on deep learning, neural networks, computer vision, natural language processing, reinforcement learning, and AI ethics. Focus on novel algorithms, applications, and theoretical advances in AI/ML domains.'
            },
            {
                title: 'Track 2: Cloud Computing & Distributed Systems',
                description: 'Research on cloud architecture, microservices, containerization, edge computing, distributed databases, and scalability. Emphasis on performance optimization and system design patterns.'
            },
            {
                title: 'Track 3: Cybersecurity & Privacy',
                description: 'Studies on cryptography, network security, blockchain technology, privacy-preserving techniques, threat detection, and secure software development. Focus on emerging security challenges and solutions.'
            },
            {
                title: 'Track 4: Data Science & Big Data Analytics',
                description: 'Papers on data mining, predictive analytics, visualization, big data frameworks, real-time processing, and data-driven decision making. Emphasis on practical applications and case studies.'
            },
            {
                title: 'Track 5: Internet of Things & Embedded Systems',
                description: 'Research on IoT architectures, sensor networks, embedded programming, smart cities, industrial IoT, and edge intelligence. Focus on innovative applications and system integration.'
            },
            {
                title: 'Track 6: Software Engineering & DevOps',
                description: 'Studies on agile methodologies, CI/CD pipelines, testing frameworks, code quality, software architecture, and automation. Emphasis on modern development practices and tools.'
            }
        ],

        submissionGuidelines: [
            'Original research papers (6-8 pages)',
            'Extended abstracts (2-4 pages)',
            'Poster presentations',
            'Workshop proposals',
            'Tutorial submissions',
            'Industry case studies'
        ],

        registrationRules: [
            'Open to researchers, faculty, and industry professionals.',
            'Students must provide valid student ID for discounted rates.',
            'At least one author must register to present the paper.',
            'Early bird registration closes 30 days before the conference.',
            'Registration includes access to all sessions, workshops, and materials.',
            'Certificate of participation provided to all registered attendees.'
        ],

        presentationRules: [
            'Each paper presentation is allocated 15-20 minutes (including Q&A).',
            'Presenters must submit slides 48 hours before the session.',
            'All presentations must be in English.',
            'Poster presentations require A0 size posters.',
            'Workshop sessions are 90 minutes long.',
            'Recording and photography are allowed with permission.'
        ],

        contact: 'Conference Chair: Dr. Rajesh Kumar | Email: conference@magnus2k26.edu',
        conferenceWebsite: 'https://magnus2k26.edu/conference',
        registrationLink: 'https://magnus2k26.edu/conference/register'
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
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#BD00FF]/20 border border-white/10 hover:border-[#BD00FF] rounded transition-all duration-300"
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
                                className="text-6xl md:text-8xl mb-4 text-[#BD00FF]"
                                style={{ fontFamily: 'VT323, monospace' }}
                            >
                                {conferenceData.title}
                            </h1>
                            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                                {conferenceData.description}
                            </p>
                        </div>
                        <div className="px-6 py-3 bg-[#BD00FF]/10 border border-[#BD00FF] rounded-lg">
                            <span className="text-[#BD00FF] font-mono text-sm tracking-wider">
                                {conferenceData.category}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Conference Tracks */}
                <div className="container mx-auto px-4 py-12">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl md:text-4xl mb-8 text-white"
                        style={{ fontFamily: 'VT323, monospace' }}
                    >
                        CONFERENCE TRACKS
                    </motion.h2>
                    <div className="space-y-6">
                        {conferenceData.tracks.map((track, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-white/5 border border-[#BD00FF]/20 rounded-lg hover:border-[#BD00FF]/50 transition-all duration-300"
                            >
                                <h3 className="text-xl text-[#BD00FF] mb-2 font-mono">{track.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{track.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Submission Guidelines */}
                <div className="container mx-auto px-4 py-12">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl md:text-4xl mb-8 text-white"
                        style={{ fontFamily: 'VT323, monospace' }}
                    >
                        SUBMISSION TYPES
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {conferenceData.submissionGuidelines.map((guideline, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-4 bg-white/5 border border-[#BD00FF]/20 rounded-lg"
                            >
                                <p className="text-gray-300 font-mono text-sm">• {guideline}</p>
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
                        className="p-8 bg-[#0A0A0A] border border-[#BD00FF]/20 rounded-xl"
                    >
                        <h3
                            className="text-2xl md:text-3xl mb-6 text-[#BD00FF]"
                            style={{ fontFamily: 'VT323, monospace' }}
                        >
                            REGISTRATION
                        </h3>
                        <ul className="space-y-3">
                            {conferenceData.registrationRules.map((rule, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-[#BD00FF] mt-1">▸</span>
                                    <span className="text-gray-400 text-sm leading-relaxed">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Presentation Rules */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 bg-[#0A0A0A] border border-[#BD00FF]/20 rounded-xl"
                    >
                        <h3
                            className="text-2xl md:text-3xl mb-6 text-[#BD00FF]"
                            style={{ fontFamily: 'VT323, monospace' }}
                        >
                            PRESENTATION RULES
                        </h3>
                        <ul className="space-y-3">
                            {conferenceData.presentationRules.map((rule, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-[#BD00FF] mt-1">▸</span>
                                    <span className="text-gray-400 text-sm leading-relaxed">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Contact & Registration */}
                <div className="container mx-auto px-4 py-12 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 bg-[#0A0A0A] border border-[#BD00FF]/20 rounded-xl"
                    >
                        <h3
                            className="text-2xl md:text-3xl mb-6 text-[#BD00FF]"
                            style={{ fontFamily: 'VT323, monospace' }}
                        >
                            CONTACT US!!
                        </h3>
                        <p className="text-gray-300 mb-8 font-mono">
                            <span className="text-[#BD00FF]">▸</span> {conferenceData.contact}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => {
                                    navigate('/conference-website');
                                    window.scrollTo(0, 0);
                                }}
                                className="inline-block px-8 py-4 bg-[#BD00FF] hover:bg-[#BD00FF]/80 text-white font-mono text-lg tracking-wider rounded-lg transition-all duration-300 shadow-lg shadow-[#BD00FF]/50 cursor-pointer"
                            >
                                REGISTER NOW
                            </button>

                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
