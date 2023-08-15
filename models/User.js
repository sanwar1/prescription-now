const mongoose = require("mongoose");
const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter valid first name."],
        },
        lastName: {
            type: String,
            required: [true, "Please enter valid last name."],
        },
        username: {
            type: String,
            unique: true,
            required: [
                true,
                "Please enter valid last name. This is a required field.",
            ],
            // validate: [validator.isEmail, "Please fill a valid email."],
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Schema Validation
const schema = (input) =>
    joi
        .object({
            firstName: joi.string().min(3).max(20).required(),
            lastName: joi.string().min(3).max(20).required(),
            username: joi.string().min(5).max(255).required(),
            password: joiPassword
                .string()
                .min(3)
                .max(255)
                .noWhiteSpaces()
                .required(),
        })
        .validate(input, { abortEarly: false });

function validateUser(user) {
    return schema(user);
}

module.exports = { User, validateUser };
