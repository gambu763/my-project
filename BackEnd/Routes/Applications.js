const express = require('express');
const router = express.Router();

// In-memory storage for applications
const applications = [];

router.get('/', (req, res) => {
    res.json(applications);
});

router.post('/',(req, res) =>{
    applications.push(req.body);
    res.status(201).json({ message: 'Application submitted successfully' });
    


})

module.exports = router;