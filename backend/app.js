// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const genderRoutes = require('./routes/genderRoutes');


const app = express();
const PORT = process.env.PORT || 3000;



// Connect to MongoDB
const dbConfig = require('./config/database');
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/auth', authRoutes);

app.use('/Gen', genderRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});