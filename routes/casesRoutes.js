const express = require("express");
const router = express.Router();
const caseController = require("../controllers/caseController");
const exportController = require("../controllers/exportController");

// New case Form: WORKING
router.get("/new", caseController.newCaseForm);

// New case SUBMIT: WORKING
router.post("/new", caseController.newCaseSubmit);

// View ALL Cases: WORKING
router.get("/", caseController.viewAllCases);

// View Recent Cases: WORKING
router.get("/recent", caseController.viewRecentCases);

// View Case: WORKING
router.get("/:id", caseController.viewCaseById);

// View Case to be Edited: SUSPENDED
// router.get("/:id/export", exportController.exportPrescription);

// View Case to be Edited: WORKING
router.get("/:id/edit", caseController.editCase);

// Post updated case: WORKING
router.post("/:id/edit", caseController.updateCase);

// Delete Patient: WORKING
router.get("/:id/delete", caseController.deleteCase);

module.exports = router;
