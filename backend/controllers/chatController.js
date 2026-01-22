const Chat = require('../models/Chat');

// @desc    Process chat message
// @route   POST /api/chat
// @access  Public
const processMessage = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    // Simple simulated AI response logic
    let botResponse = 'Thank you for your message! Our team will get back to you shortly.';

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        botResponse = 'Hello! I am your AI assistant. How can I help you today?';
    } else if (message.toLowerCase().includes('event')) {
        botResponse = 'We have many exciting events! Check out our Events section for details like Hack-a-thon, Paper Presentation, and more.';
    } else if (message.toLowerCase().includes('register')) {
        botResponse = 'You can register for events by clicking the "Add to Cart" button on the event details page.';
    }

    try {
        // Optional: Save chat history
        // await Chat.create({ userMessage: message, botResponse });
        res.json({ response: botResponse });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    processMessage,
};
