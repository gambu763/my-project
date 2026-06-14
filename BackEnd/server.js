require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json());
const port = 5000;
app.use(cors());



const applications = []

app.get("/", (req, res) => {
    res.status(200).json({ message: 'API is alive ' });
});

app.get('/Health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

const applicationsRouter = require('./Routes/Applications');
app.use('/applications', applicationsRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
    console.log('Server is running on port 5000');
});