const express = require('express');
const app = express();
app.use(express.json());
const port = 5000;

const applications = []

app.get("/", (req, res) => {
    res.status(200).json({ message: 'API is alive ' });
});

app.get('/Health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

const applicationsRouter = require('./Routes/Applications');
app.use('/applications', applicationsRouter);

app.listen(port, () => {
    console.log('Server is running on port 5000');
});