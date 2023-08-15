const { Patient, validatePatient } = require("../models/Patient");

// View All Patients
exports.viewAllPatients = async (req, res, next) => {
    try {
        let patients = await Patient.find();
        if (patients.length == 0) {
            throw new Error("No patients in the database!");
        } else {
            res.render("patients", { patients });
        }
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: "No patient records in the Database!",
            msg2: "Navigate to the home page to create patient records and case records.",
        };
        res.render("error", { data });
    }
};

// View All Female Patients
exports.viewFemalePatients = async (req, res, next) => {
    try {
        let patients = await Patient.find({ gender: "F" });
        if (patients.length == 0) {
            throw new Error("No female patients in the database!");
        } else {
            res.render("patients", { patients });
        }
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: "No female patient records in the Database!",
            msg2: "Navigate to the home page to create patient records and case records.",
        };
        res.render("error", { data });
    }
};

// View a patient
exports.viewPatientById = async (req, res, next) => {
    try {
        let patient = await Patient.findById({ _id: req.params.id });
        if (patient == null) {
            throw new Error("Patient Not Found!");
        } else {
            res.render("patient", { patient });
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

// Edit a patient (Form)
exports.editPatient = async (req, res, next) => {
    try {
        let patient = await Patient.findById(req.params.id);
        res.render("edit-patient", { patient });
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: error.message,
            msg2: error.body,
        };
        res.render("error", { data });
    }
};

// Update a patient
exports.updatePatient = async (req, res, next) => {
    try {
        await Patient.findByIdAndUpdate(req.params.id, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.date,
                gender: req.body.gender,
                phoneNumber: req.body.phone,
                email: req.body.email,
            },
        });
        res.redirect(`/patients/${req.params.id}`);
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: error.message,
            msg2: error.body,
        };
        res.render("error", { data });
    }
};

// Delete a patient
exports.deletePatient = async (req, res, next) => {
    try {
        throw new Error("This feature is currently disabled on the website.");
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: error.message,
            msg2: error.body,
        };
        res.render("error", { data });
    }
};
