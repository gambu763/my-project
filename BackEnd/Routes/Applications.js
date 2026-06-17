const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");

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

router.post(
  "/",
  upload.fields([
    { name: "sitePlan", maxCount: 1 },
    { name: "gisAerial", maxCount: 1 },
    { name: "supportingDocument", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (
  !req.files.sitePlan ||
  !req.files.gisAerial ||
  !req.files.supportingDocument
) {
  return res.status(400).json({
    message: "All documents are required",
  });
}
      const application = new Application({
        ...req.body,

        sitePlan:
          req.files.sitePlan?.[0]?.path || "",

        gisAerial:
          req.files.gisAerial?.[0]?.path || "",

        supportingDocument:
          req.files.supportingDocument?.[0]?.path || "",
      });

      await application.save();

      res.status(201).json({
        message:
          "Application submitted successfully",
        application,
      });
    } catch (error) {
      res.status(500).json({
  message: error.message || "Upload failed",
});
      
    }
  }
);    


module.exports = router;