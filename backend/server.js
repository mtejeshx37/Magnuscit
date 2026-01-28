const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load .env from backend directory explicitly
const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

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

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
