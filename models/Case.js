const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
    {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
        prescriptionDate: {
            type: Date,
            required: [true, "Prescription date is required."],
        },
        complaintAndSymptoms: {
            type: String,
            required: [
                true,
                "Please enter the patient's chief complaint and symptoms.",
            ],
        },
        patientHistory: {
            type: String,
            required: [true, "Please enter the patient's history."],
        },
        recommendations: {
            type: String,
            required: [
                true,
                "Please enter the doctor's recommendations for the patient.",
            ],
        },
        prescription: {
            type: [
                {
                    medicine: String,
                    dosage: String,
                    frequency: String,
                    duration: Number,
                },
            ],
        },
        diagnosticTests: {
            type: [String],
        },
    },
    { timestamps: true }
);

const Case = mongoose.model("Case", caseSchema);

// Schema Validation
const schema = (input) =>
    joi
        .object({
            patientID: joi.any().required(),
            complaintAndSymptoms: joi.string().min(2).required(),
            patientHistory: joi.string().min(2).required(),
            recommendations: joi.string().min(2).required(),
            prescription: joi.array().items({
                name: joi.string(),
                dosage: joi.string(),
                frequency: joi.string(),
                duration: joi.number(),
            }),
            diagnosticTests: joi.array().items(joi.string()),
        })
        .validate(input, { abortEarly: false });

function validateCase(caseFile) {
    return schema(caseFile);
}

module.exports = { Case, validateCase };
