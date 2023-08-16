const express = require("express");
const router = express.Router();
const casesRoutes = require("./casesRoutes");
const patientRoutes = require("./patientRoutes");
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const exportContoller = require("../controllers/exportController");
const { verifySession } = require("../middleware/authFunctions");

// Sign-In Page and Methods
router.get("/signin", authController.signInForm); // Working
router.post("/signin", authController.signInSubmit); // Working

// Sign-Up Pages and Methods
router.get("/signup", authController.signUpForm); // Working
router.post("/signup", authController.signUpSubmit); // Working

// Sign-Out
router.get("/signout", authController.signOut); // Working

// Home page route: Working
router.get("/", verifySession, homeController.homeView);

// Other routes
router.use("/patients", verifySession, patientRoutes); // Working
router.use("/cases", verifySession, casesRoutes); // Working

// Print preview route
router.get("/export/:id", exportContoller.exportPrescription); // Pending

module.exports = router;
