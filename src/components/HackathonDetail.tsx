import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export function HackathonDetail() {
    const navigate = useNavigate();

    const hackathonData = {
        title: 'HACKATHON',
        category: 'COMPETITION',
        description: 'Will Be Updated Soon',

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
        registrationLink: 'https://athera-hackathon.vercel.app/'
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="container mx-auto px-4 py-6">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/#prime-directives')}
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

            {/* Coming Soon Message */}
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-12 bg-[#0A0A0A] border border-[#00D1FF]/20 rounded-xl text-center"
                >
                    <h2
                        className="text-3xl md:text-4xl mb-4 text-[#00D1FF]"
                        style={{ fontFamily: 'VT323, monospace' }}
                    >
                        COMING SOON
                    </h2>
                    <p className="text-gray-300 text-lg font-mono">
                        All details about the hackathon will be updated soon.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
