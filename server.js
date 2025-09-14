const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const tenantRoutes = require('./routes/tenant');
const userRoutes = require('./routes/users');
const notesRoutes = require('./routes/notesRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/tenants', tenantRoutes);
app.use('/users', userRoutes);
app.use('/notes', notesRoutes);
app.use('/subscription', subscriptionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});