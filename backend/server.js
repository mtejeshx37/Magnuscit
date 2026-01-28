const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');

connectDB();

const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/events', eventRoutes);
app.use('/api/chat', chatRoutes);

const emailRoutes = require('./routes/emailRoutes');
app.use('/api/email', emailRoutes);

const registrationRoutes = require('./routes/registrationRoutes');
app.use('/api/registrations', registrationRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
