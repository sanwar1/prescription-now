const mongoose = require("mongoose");
const validator = require("validator");
const joi = require("joi");

const patientSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter valid first name."],
        },
        lastName: {
            type: String,
            required: [true, "Please enter valid last name."],
        },
        dateOfBirth: {
            type: Date,
            required: [
                true,
                "Please enter valid Date of Birth. This is a required field.",
            ],
        },
        gender: {
            type: String,
            enum: ["M", "F", "O"],
            required: [true, "Gender is required."],
        },
        phoneNumber: {
            type: Number,
            min: 1000000000,
            max: 9999999999,
            unique: true,
            required: [true, "Please enter a phone number."],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email address is required."],
            validate: [validator.isEmail, "Please fill a valid email."],
        },
    },
    { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

// Schema Validation
const schema = (input) =>
    joi
        .object({
            firstName: joi.string().min(3).max(20).required(),
            lastName: joi.string().min(3).max(20).required(),
            dateOfBirth: joi.date().iso().required(),
            gender: joi.any().valid("M", "F", "O").required(),
            phoneNumber: joi
                .number()
                .integer()
                .greater(1000000000)
                .less(9999999999)
                .required(),
            email: joi.string().min(5).max(255).required().email(),
        })
        .validate(input, { abortEarly: false });

function validatePatient(patient) {
    return schema(patient);
}

module.exports = { Patient, validatePatient };
