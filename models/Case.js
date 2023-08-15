const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
    {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
        prescriptionDate: {
            type: Date,
            required: [true, "Prescription date is required."],
        },
        chiefComplaint: {
            type: String,
            required: [true, "Please enter the patient's chief complaint."],
        },
        symptomsHistory: {
            type: String,
            required: [true, "Please enter the patient's symptoms/history."],
        },
        recommendations: {
            type: String,
            required: [true, "Please enter the patient's symptoms/history."],
        },
        prescription: {
            type: [
                {
                    medicine: String,
                    dosage: String,
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
            chiefComplaint: joi.string().min(2).required(),
            symptomsHistory: joi.string().min(2).required(),
            recommendations: joi.string().min(2).required(),
            prescription: joi.array().items({
                name: joi.string(),
                dosage: joi.string(),
                duration: joi.number(),
            }),
            diagnosticTests: joi.array().items(joi.string()),
        })
        .validate(input, { abortEarly: false });

function validateCase(caseFile) {
    return schema(caseFile);
}

module.exports = { Case, validateCase };
