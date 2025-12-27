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
                title: 'Machine Learning & Deep Learning',
                description: 'Papers on deep learning, neural networks, supervised and unsupervised learning, reinforcement learning, transfer learning, generative models (GANs, VAEs, Diffusion models), and graph neural networks. Focus on novel algorithms and theoretical advances in ML/DL domains.'
            },
            {
                title: 'Natural Language Processing',
                description: 'Research on large language models and transformers, machine translation, multilingual NLP, text generation and summarization, sentiment analysis, question answering, conversational AI, and information extraction.'
            },
            {
                title: 'Computer Vision & Image Processing',
                description: 'Studies on object detection and recognition, image segmentation and generation, video analysis and action recognition, 3D vision and scene understanding, medical image analysis, and visual question answering.'
            },
            {
                title: 'AI for Social Good & Applications',
                description: 'Papers on healthcare and medical diagnosis AI, agricultural AI and precision farming, educational technology and intelligent tutoring, environmental monitoring and climate AI, smart cities and urban computing, and disaster response applications.'
            },
            {
                title: 'Trustworthy & Responsible AI',
                description: 'Research on AI ethics and fairness, explainable and interpretable AI, privacy-preserving machine learning, robustness and adversarial learning, AI safety and alignment, and bias detection and mitigation.'
            },
            {
                title: 'Emerging AI Topics',
                description: 'Studies on quantum machine learning, neuromorphic computing, AI on edge devices and IoT, federated and distributed learning, AutoML and neural architecture search, and AI-assisted scientific discovery.'
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
                        CONFERENCE TRACKS – RELATED TO ARTIFICIAL INTELLIGENCE
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



                {/* Rules Section */}
                <div className="container mx-auto px-4 py-12">
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
                            CONFERENCE CONTACT
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="p-4 bg-white/5 rounded-lg border border-[#BD00FF]/10">
                                <p className="text-white font-semibold mb-1">Charan Selva Dhanush</p>
                                <p className="text-gray-400 text-sm mb-2">Organizing Committee</p>
                                <a href="tel:+919962524758" className="text-[#BD00FF] hover:text-[#BD00FF]/80 font-mono text-sm transition-colors">
                                    📞 +91 99625 24758
                                </a>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-[#BD00FF]/10">
                                <p className="text-white font-semibold mb-1">Ramapriya Ramamoorthy</p>
                                <p className="text-gray-400 text-sm mb-2">Organizing Committee</p>
                                <a href="tel:+919150622416" className="text-[#BD00FF] hover:text-[#BD00FF]/80 font-mono text-sm transition-colors">
                                    📞 +91 91506 22416
                                </a>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-[#BD00FF]/10">
                                <p className="text-white font-semibold mb-1">Varshha</p>
                                <p className="text-gray-400 text-sm mb-2">Organizing Committee</p>
                                <a href="tel:+918939777852" className="text-[#BD00FF] hover:text-[#BD00FF]/80 font-mono text-sm transition-colors">
                                    📞 +91 89397 77852
                                </a>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-[#BD00FF]/10">
                                <p className="text-white font-semibold mb-1">Latheesh Saran</p>
                                <p className="text-gray-400 text-sm mb-2">Organizing Committee</p>
                                <a href="tel:+916382235520" className="text-[#BD00FF] hover:text-[#BD00FF]/80 font-mono text-sm transition-colors">
                                    📞 +91 6382235520
                                </a>
                            </div>
                        </div>
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
