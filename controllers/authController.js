const { User, validateUser } = require("../models/User");
const createError = require("http-errors");
const authFunctions = require("../middleware/authFunctions");

// Sign Up Form
exports.signUpForm = async (req, res, next) => {
    const alertMessage = req.query.alert || null;
    res.render("signup", { alertMessage });
};

// Sign Up Submit
exports.signUpSubmit = async (req, res, next) => {
    try {
        // Validate request
        console.log(req.body);
        const { error } = validateUser(req.body);
        if (error) {
            createError.BadRequest(
                "User details are not in a valid schema: " + error.message
            );
        } else {
            // Check if the user already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                next(
                    createError.BadRequest(
                        "User already registered with this Email ID."
                    )
                );
            } else {
                // If not, update the password hash, save to DB

                let newUser = new User(req.body);
                newUser.password = authFunctions.passwordHash(
                    req.body.password
                );
                let savedUser = await newUser.save();
                console.log("User successfully saved: " + savedUser);
                // If successful, redirect to Sign In Page
                const data = { msg: "SignUp successful. Sign In!" };
                res.redirect(`/signin?alert=${data.msg}`);
            }
        }
    } catch (error) {
        // If err, redirect to Sign Up Page
        const data = { msg: "SignUp failed. Try again!" };
        res.redirect(`/signup?alert=${data.msg}`);
    }
};

// Sign In
exports.signInForm = async (req, res, next) => {
    const alertMessage = req.query.alert || null;
    res.render("signin", { alertMessage });
};

exports.signInSubmit = async (req, res, next) => {
    // Check if the user actually exists, else redirect to another page
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        const data = { msg: "Invalid Credentails!" };
        return res.redirect(`/signin?alert=${data.msg}`);
    }

    // Check if the password hash matches
    const storedPassword = user.password;
    const givenPassword = authFunctions.passwordHash(req.body.password);

    // console.log("Comparing pwds: \n" + storedPassword + "\n" + givenPassword);
    if (authFunctions.compareHash(storedPassword, givenPassword)) {
        // console.log("Password hashes match!");
        // If matches, create access token, refresh token, set cookie, redirect to profile
        const payload = {
            email: req.body.email,
            role: user.role,
        };
        const accessToken = authFunctions.createAccessToken(payload);
        const refreshToken = authFunctions.createRefreshToken(payload);
        if (accessToken && refreshToken) {
            // console.log(
            //     JSON.stringify(accessToken) +
            //         "\n" +
            //         JSON.stringify(refreshToken)
            // );
            // console.log("Tokens generated!");
            res.cookie("auth_token", accessToken);
            res.cookie("refresh_token", refreshToken);
            res.redirect("/");
        } else {
            // console.log("Tokens ERROR!");
            // console.log(accessToken + "\n" + refreshToken);
            const data = { msg: "Please Login Again!" };
            res.redirect(`/signin?alert=${data.msg}`);
        }
    } else {
        // console.log("Passwords DON'T MATCH!");
        // If no, redirect to Sign In
        const data = { msg: "Invalid Credentails!" };
        res.redirect(`/signin?alert=${data.msg}`);
    }
};

// Profile
exports.profile = async (req, res, next) => {
    res.status(200).sendFile("html/profile.html", { root: __dirname });
};

// Sign Out
exports.signOut = async (req, res, next) => {
    const data = { msg: "Successfully Signed Out!" };
    res.clearCookie("auth_token");
    res.clearCookie("refresh_token");
    res.redirect(`/signin?alert=${data.msg}`);

    // res.status(200).sendFile("html/signout.html", { root: __dirname });
};
