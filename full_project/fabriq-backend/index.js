const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/recRoutes');
const imageRoutes = require('./routes/imageRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'));

app.use('/api/recommendation', userRoutes);
app.use('/api/body-shape', imageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
    