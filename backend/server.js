// server.js is the Main Receptionist sitting at the front desk.

const express = require('express');
// Express (to handle web requests)

const cors = require('cors');
// CORS (allows your React app on port 5173 to talk to this server)
const mongoose = require('mongoose');
//import
require('dotenv').config();
// to read secret passwords (unlocks the .env file)

const app = express();
// the Express server engine on.

app.use(cors({ origin: 'http://localhost:5173' }));
// now the react frontend is allowed to enter the building

app.use(express.json());
// to read JSON text formats (so the server understands data sent from React later)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/products', require('./routes/products'));

//why we wrote this ? 
app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URI)
// using our database link which is hidden in .env
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
