const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const dealRoutes = require('./routes/dealRoutes');
const claimRoutes = require('./routes/claimRoutes');

// Initialize Express app
const app = express();

// CORS configuration - allows dynamic origin for production
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/claims', claimRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Startup Benefits Platform API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
