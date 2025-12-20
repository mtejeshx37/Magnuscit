const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Event = require('./models/Event');

dotenv.config();

const events = [
    {
        id: 1,
        title: 'PROMPT PIXEL',
        type: 'TECHNICAL',
        price: '₹150',
        description: 'An innovative event where participants type creative prompts and extract critical information from AI-generated visuals and tackle a series of engaging tasks and navigate to their final destination.',
        registrationRules: [
            'Individual participation or teams of 2.',
            'Valid college ID is mandatory.',
            'Participants must wear the registration tag throughout.',
            'Prior registration is required.',
            'Fee is non-refundable.',
        ],
        eventRules: [
            'Participants must generate visuals using provided AI tools.',
            'Time limit will be strictly enforced.',
            'Judges decision is final.',
            'No usage of personal accounts for generation unless specified.',
        ],
        contact: 'Latheesh Saran: +916382235520',
    },
    {
        id: 2,
        title: 'PODCAST MONOLOGUE',
        type: 'TECHNICAL',
        price: '₹150',
        description: 'Podcast Monologue is a speaking event where participants spin a wheel to receive a randomly selected topic and deliver a one-minute monologue in a podcast-style format. The event focuses on spontaneous speaking within a fixed time limit.',
        registrationRules: [
            'Individual participation only.',
            'Valid college ID is mandatory.',
            'Prior registration is required.',
        ],
        eventRules: [
            'Topic is selected via wheel spin.',
            'One minute preparation time may be given.',
            'Speaking time is exactly one minute.',
            'Fluency and content relevance will be judged.',
        ],
        contact: 'Latheesh Saran: +916382235520',
    },
    {
        id: 3,
        title: 'TECHIE XO',
        type: 'TECHNICAL',
        price: '₹150',
        description: 'Techie XO is an interactive team-based event where two teams compete by answering technical questions. When a team answers a question correctly, they earn the chance to make a move on the XO game board. The game continues with teams alternating turns, combining technical knowledge with strategic gameplay to determine the winner.',
        registrationRules: [
            'Team participation (2 members).',
            'Valid college ID is mandatory.',
        ],
        eventRules: [
            'Correct answer grants a move on the XO board.',
            'Wrong answer passes the turn to the opponent.',
            'Standard Tic-Tac-Toe rules apply for winning the board.',
            'Technical questions cover CS basics.',
        ],
        contact: 'Latheesh Saran: +916382235520',
    },
    {
        id: 4,
        title: 'TECH TAMASHA',
        type: 'TECHNICAL',
        price: '₹150',
        description: 'Tech Tamasha is a structured multi-round technical event that evaluates participants’ familiarity with the technology ecosystem. The first round involves identifying well-known technology logos. In the second round, participants must recognize technology-related audio cues, such as application or system sounds. The final round features Akinator, providing an interactive conclusion to the event.',
        registrationRules: [
            'Teams of 2-3 members.',
            'Valid college ID is mandatory.',
        ],
        eventRules: [
            'Round 1: Logo Quiz.',
            'Round 2: Audio Recognition.',
            'Round 3: Akinator Challenge.',
            'No electronic devices allowed during the quiz.',
        ],
        contact: 'Latheesh Saran: +916382235520',
    },
    {
        id: 5,
        title: 'LOGIC RUSH',
        type: 'TECHNICAL',
        price: '₹150',
        description: 'Logic Rush is a fast-paced one-on-one aptitude challenge where two players compete by solving five different types of questions. Each correct answer gives a player the chance to burst their opponent’s balloon, adding a fun twist to the battle of wits. The game continues in this solve-and-burst format, and the player with the most balloons left at the end emerges as the winner.',
        registrationRules: [
            'Individual participation.',
            'Valid college ID is mandatory.',
        ],
        eventRules: [
            'Head-to-head competition.',
            'Solve question to burst opponent balloon.',
            '5 rounds of questions.',
            'Highest remaining balloons wins.',
        ],
        contact: 'Latheesh Saran: +916382235520',
    },
    {
        id: 6,
        title: 'ACCURACY ARENA',
        type: 'TECHNICAL',
        price: '₹150',
        description: 'Accuracy Arena is a structured machine learning competition in which participants are provided with a dataset and are required to design, train, and optimize a predictive model. The objective is to achieve the highest possible accuracy based on a predefined evaluation metric. Submissions will be assessed on a standardized test dataset, and the participant or team with the best-performing model will be declared the winner and awarded prizes.',
        registrationRules: [
            'Individual or Team of 2.',
            'Valid college ID is mandatory.',
            'Laptops required.',
        ],
        eventRules: [
            'Dataset provided at start of event.',
            'Model must be trained during the event.',
            'Highest accuracy on test set wins.',
            'Code must be submitted for verification.',
        ],
        contact: 'Latheesh Saran: +916382235520',
    },
    {
        id: 7,
        title: 'CODE EUPHORIA',
        type: 'TECHNICAL',
        price: '₹150',
        description: 'Participants tackle a series of progressively complex coding tasks. The event consists of multiple coding rounds with varying challenges. Each level introduces a new format, keeping the competition fresh and engaging.',
        registrationRules: [
            'Individual participation.',
            'Valid college ID is mandatory.',
        ],
        eventRules: [
            'Multiple rounds of coding.',
            'Languages supported: C/C++, Java, Python.',
            'Plagiarism checks enabled.',
            'Solvers of higher complexity problems rank higher.',
        ],
        contact: 'Latheesh Saran: +916382235520',
    },
    {
        id: 5,
        title: 'DEEP LEARNING WORKSHOP',
        type: 'WORKSHOP',
        price: '₹200',
        description: 'This workshop will provide participants with an understanding of deep learning principles, best practices, and strategies. Learn hands-on neural network training, understand architectures, and build real AI models. Perfect for beginners and intermediate learners looking to enhance their skills.',
        registrationRules: [
            'Only college students are permitted to participate.',
            'A valid college ID is mandatory.',
            'Participants must wear the registration throughout the day.',
            'Prior registration is required through online or on-spot methods.',
            'Re-entry is not allowed, and the fee paid for any event/workshop is non-refundable.',
        ],
        eventRules: [
            'Participants must bring their own laptops with necessary software and tools installed (e.g., Python, TensorFlow).',
            'A basic understanding of Python and machine learning concepts is required to participate.',
            'Active participation is expected in all exercises and real-world case studies.',
            'No use of mobile phones, external gadgets, or unauthorized resources during the session.',
            'Disruptive behavior will result in disqualification from the workshop.',
            'Participants should refrain from sharing or using unauthorized code during practical sessions.',
            'Workshop materials and resources provided by the instructors should not be distributed or used for commercial purposes.',
            'Participants will have the chance to ask questions, but must ensure it doesn\'t disrupt the flow of the workshop.',
        ],
        contact: 'Latheesh Saran: +916382235520',
    },
    {
        id: 6,
        title: 'AI ETHICS PANEL',
        type: 'NON-TECHNICAL',
        price: '₹50',
        description: 'Join industry leaders and academics for an engaging discussion on responsible AI development. Explore ethical challenges, bias in algorithms, privacy concerns, and the societal impact of artificial intelligence. This panel provides insights into building AI that benefits humanity.',
        registrationRules: [
            'Open to all college students.',
            'Valid college ID required.',
            'Participants must wear the registration tag.',
            'Registration fee is non-refundable.',
            'Prior online or on-spot registration required.',
        ],
        eventRules: [
            'Panel is an interactive discussion format.',
            'Audience members can ask questions during Q&A session.',
            'Respectful discourse and professional behavior expected.',
            'No recording or photography without permission.',
            'Questions should be relevant to AI ethics and development.',
            'Disruptive behavior may result in removal from the session.',
        ],
        contact: 'Latheesh Saran: +916382235520',
    },
];

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Event.deleteMany();

        await Event.insertMany(events);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
