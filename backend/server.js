require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Health check – confirms backend is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Connect to MongoDB if MONGODB_URI is set (e.g. in .env)
if (process.env.MONGODB_URI) {
  connectDB();
} else {
  console.log('No MONGODB_URI set – running without database. Add .env with MONGODB_URI to connect.');
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
