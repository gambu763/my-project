const express = require('express');
const router = express.Router();

const Application = require('../Models/ApplicationsM');

router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching applications',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body);

    await application.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error saving application',
      error: error.message
    });
  }
});

module.exports = router;