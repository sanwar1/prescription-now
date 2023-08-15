const { Case } = require("../models/Case");
const { Patient } = require("../models/Patient");
const { prescriptionMaker } = require("../utility/prescriptionMaker");

// View all cases: WORKING
exports.viewAllCases = async (req, res, next) => {
    try {
        let cases = await Case.find();
        if (cases.length == 0) {
            throw new Error("No case files in the database!");
        } else {
            res.render("cases", { cases });
        }
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: "No case records in the Database!",
            msg2: "Navigate to the home page to create patient records and case records.",
        };
        res.render("error", { data });
    }
};

// View recent cases: WORKING
exports.viewRecentCases = async (req, res, next) => {
    try {
        // Define cutoff date
        let currentDate = new Date();
        let cutoffDate = currentDate.setDate(currentDate.getDate() - 30);

        let cases = await Case.find({ createdAt: { $gte: cutoffDate } });
        if (cases.length == 0) {
            throw new Error("No case files in the database!");
        } else {
            res.render("cases", { cases });
        }
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: "No new case records in the Database!",
            msg2: "Navigate to the home page to create patient records and case records.",
        };
        res.render("error", { data });
    }
};

// New Case FORM: WORKING
exports.newCaseForm = async (req, res, next) => {
    try {
        // using phone number, find patient
        let patient = await Patient.findOne({ phoneNumber: req.query.phone });
        // if patient doesn't exist, send new form
        if (patient == null) {
            let newPatient = { phone: req.query.phone };
            res.render("newPatient-newcase", { newPatient });
        } else {
            // Else, pull patient details, send populated form
            let patient = await Patient.findOne({
                phoneNumber: req.query.phone,
            });
            res.render("oldPatient-newcase", { patient });
        }
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: error.message,
            msg2: error.body,
        };
        res.render("error", { data });
    }
};

// New Case SUBMIT: WORKING
exports.newCaseSubmit = async (req, res, next) => {
    try {
        // Dispatch Prescription
        const prescription = prescriptionMaker(
            req.body.medicine,
            req.body.dosage,
            req.body.duration
        );
        // Check Patient ID
        if (req.body.patientID == null) {
            // If new, create patient
            let newPatient = new Patient({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dob,
                gender: req.body.gender,
                phoneNumber: req.body.phone,
                email: req.body.email,
            });
            let savedPatient = await newPatient.save();

            // then, create case
            let newCase = new Case({
                patient: savedPatient._id,
                prescriptionDate: req.body.date,
                chiefComplaint: req.body.chiefComplaint,
                symptomsHistory: req.body.symptomsHistory,
                recommendations: req.body.recommendations,
                prescription: prescription,
                diagnosticTests: req.body.diagnosticTests,
            });
            let savedCase = await newCase.save();
            res.redirect(`/cases/${savedCase._id}`);
        } else {
            // If old, create case
            // then, create case
            let newCase = new Case({
                patient: req.body.patientID,
                prescriptionDate: req.body.date,
                chiefComplaint: req.body.chiefComplaint,
                symptomsHistory: req.body.symptomsHistory,
                recommendations: req.body.recommendations,
                prescription: prescription,
                diagnosticTests: req.body.diagnosticTests,
            });
            let savedCase = await newCase.save();
            res.redirect(`/cases/${savedCase._id}`);
        }
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: error.message,
            msg2: error.body,
        };
        res.render("error", { data });
    }
};

// View a Case: WORKING
exports.viewCaseById = async (req, res, next) => {
    try {
        let caseFile = await Case.findById({ _id: req.params.id });
        if (caseFile == null) {
            throw new Error("Case File Not Found!");
        } else {
            // Find Patient
            let patient = await Patient.findById({ _id: caseFile.patient });
            res.render("casefile", { caseFile, patient });
        }
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: error.message,
            msg2: error.body,
        };
        res.render("error", { data });
    }
};

// Edit a Case (Form): WORKING
exports.editCase = async (req, res, next) => {
    try {
        let casefile = await Case.findById(req.params.id);
        let patient = await Patient.findById(casefile.patient);
        let data = { casefile: casefile, patient: patient };
        res.render("edit-case", { data });
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: "No case records in the Database!",
            msg2: "Navigate to the home page to create patient records and case records.",
        };
        res.render("error", { data });
    }
};

// Update a case: WORKING
exports.updateCase = async (req, res, next) => {
    try {
        // Dispatch Prescription
        const prescription = prescriptionMaker(
            req.body.medicine,
            req.body.dosage,
            req.body.duration
        );

        await Case.findByIdAndUpdate(req.params.id, {
            $set: {
                prescriptionDate: req.body.date,
                chiefComplaint: req.body.chiefComplaint,
                symptomsHistory: req.body.symptomsHistory,
                recommendations: req.body.recommendations,
                prescription: prescription,
                diagnosticTests: req.body.diagnosticTests,
            },
        });
        res.redirect(`/cases/${req.params.id}`);
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: "No case records in the Database!",
            msg2: "Navigate to the home page to create patient records and case records.",
        };
        res.render("error", { data });
    }
};

// Delete a case: WORKING
exports.deleteCase = async (req, res, next) => {
    try {
        await Case.findByIdAndDelete(req.params.id);
        res.redirect("/cases/");
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: error.message,
            msg2: error.body,
        };
        res.render("error", { data });
    }
};
