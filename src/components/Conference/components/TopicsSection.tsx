import { Lightbulb } from 'lucide-react';

export const TopicsSection = () => {
    const topics = [
        {
            title: 'Machine Learning & Deep Learning',
            points: [
                'Supervised and unsupervised learning',
                'Deep neural networks and architectures',
                'Reinforcement learning and multi-agent systems',
                'Transfer learning and few-shot learning',
                'Generative models (GANs, VAEs, Diffusion models)',
                'Graph neural networks'
            ]
        },
        {
            title: 'Natural Language Processing',
            points: [
                'Large language models and transformers',
                'Machine translation and multilingual NLP',
                'Text generation and summarization',
                'Sentiment analysis and emotion recognition',
                'Question answering and conversational AI',
                'Information extraction and text mining'
            ]
        },
        {
            title: 'Computer Vision & Image Processing',
            points: [
                'Object detection and recognition',
                'Image segmentation and generation',
                'Video analysis and action recognition',
                '3D vision and scene understanding',
                'Medical image analysis',
                'Visual question answering'
            ]
        },
        {
            title: 'AI for Social Good & Applications',
            points: [
                'Healthcare and medical diagnosis AI',
                'Agricultural AI and precision farming',
                'Educational technology and intelligent tutoring',
                'Environmental monitoring and climate AI',
                'Smart cities and urban computing',
                'Disaster response and humanitarian AI'
            ]
        },
        {
            title: 'Trustworthy & Responsible AI',
            points: [
                'AI ethics and fairness',
                'Explainable and interpretable AI',
                'Privacy-preserving machine learning',
                'Robustness and adversarial learning',
                'AI safety and alignment',
                'Bias detection and mitigation'
            ]
        },
        {
            title: 'Emerging AI Topics',
            points: [
                'Quantum machine learning',
                'Neuromorphic computing',
                'AI on edge devices and IoT',
                'Federated and distributed learning',
                'AutoML and neural architecture search',
                'AI-assisted scientific discovery'
            ]
        }
    ];

    return (
        <section id="topics" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Conference Tracks – Related to Artificial Intelligence</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We welcome submissions on all aspects of artificial intelligence. The following list provides guidance on topics of particular interest, though submissions are not limited to these areas.
                </p>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {topics.map((topic, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                            <h3 className="text-lg font-bold text-gray-900">{topic.title}</h3>
                        </div>
                        <ul className="space-y-3">
                            {topic.points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                                    <span className="text-blue-500 mt-0.5 flex-shrink-0">▸</span>
                                    <span className="leading-relaxed">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-lg shadow-blue-900/20 text-center md:text-left">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <Lightbulb className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Beyond These Topics?</h3>
                    <p className="text-blue-100 text-lg leading-relaxed">
                        This list is not exhaustive. We encourage submissions on emerging areas, interdisciplinary topics, and novel applications of AI.
                    </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20">
                    <p className="text-white font-semibold">
                        Open to all AI-related research
                    </p>
                </div>
            </div>
        </section>
    );
};
