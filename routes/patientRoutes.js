const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

// View all patients: WORKING
router.get("/", patientController.viewAllPatients);

// View female patients: WORKING
router.get("/female", patientController.viewFemalePatients);

// View a patient: WORKING
router.get("/:id", patientController.viewPatientById);

// Edit a patient (Form): WORKING
router.get("/:id/edit", patientController.editPatient);

// Update a patient (Submit): REQUIRED
router.post("/:id/edit", patientController.updatePatient);

// // Delete a patient
router.get("/:id/delete", patientController.deletePatient);

module.exports = router;
