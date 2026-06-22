const express = require("express");
const PDFDocument = require("pdfkit");
const Application = require("../Models/ApplicationsM");

const router = express.Router();

const safeValue = (value) => {
  return value ? value : "Not Provided";
};
router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${application.name}.pdf`
    );

    doc.pipe(res);

    // Title
    doc
      .fontSize(20)
      .text("Land Application Report", {
        align: "center",
      });

    doc.moveDown();

    // Applicant Information
    doc
      .fontSize(16)
      .text("Applicant Information");

    doc.moveDown(0.5);

    doc.text(
      `Name: ${safeValue(application.name)}`
    );

    doc.text(
      `Email: ${safeValue(application.email)}`
    );

    doc.text(
      `Phone: ${safeValue(application.phone)}`
    );

    doc.moveDown();

    // Application Details
    doc
      .fontSize(16)
      .text("Application Details");

    doc.moveDown(0.5);

    doc.text(
      `Application Type: ${safeValue(
        application.applicationType
      )}`
    );

    doc.text(
      `Current Zoning: ${safeValue(
        application.currentZoning
      )}`
    );

    doc.text(
      `Property Description: ${safeValue(
        application.propertyDescription
      )}`
    );

    doc.text(
      `Street Address: ${safeValue(
        application.streetAddress
      )}`
    );

    doc.moveDown();

    // Documents
    doc
      .fontSize(16)
      .text("Supporting Documents");

    doc.moveDown(0.5);

    doc.text(
      `Site Plan: ${safeValue(
        application.sitePlan
      )}`
    );

    doc.text(
      `GIS Aerial: ${safeValue(
        application.gisAerial
      )}`
    );

    doc.text(
      `Supporting Document: ${safeValue(
        application.supportingDocument
      )}`
    );

    doc.moveDown();

    // Metadata
    doc
      .fontSize(16)
      .text("Submission Information");

    doc.moveDown(0.5);

    doc.text(
      `Submitted: ${new Date(
        application.createdAt
      ).toLocaleString()}`
    );

    doc.end();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;