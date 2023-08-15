const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
require("dotenv").config({ path: "../config/.env" });

// Create Access Tokens
function createAccessToken(payload) {
    try {
        return jwt.sign(payload, process.env.ACCESS_KEY, {
            expiresIn: 3600,
        });
    } catch (error) {
        // console.error("Error creating access token:", error);
        return false;
    }
}

// Create Refresh Tokens
function createRefreshToken(payload) {
    try {
        return jwt.sign(payload, process.env.REFRESH_KEY, {
            expiresIn: 86400,
        });
    } catch (error) {
        return false;
    }
}

// Verify Access Tokens
function verifyAccessToken(auth_token) {
    try {
        return {
            decodedAccessToken: jwt.verify(auth_token, process.env.ACCESS_KEY),
            accTokError: false,
        };
    } catch (error) {
        console.error("Error verifying access token:", error);
        return { decodedAccessToken: false, accTokError: error };
    }
}

// Verify Refresh Tokens
function verifyRefreshToken(refresh_token) {
    try {
        return {
            decodedRefreshToken: jwt.verify(
                refresh_token,
                process.env.REFRESH_KEY
            ),
            refTokError: false,
        };
    } catch (error) {
        console.error("Error verifying refresh token:", error);
        return { decodedRefreshToken: false, refTokError: error };
    }
}

// Verifying Sessions
function verifySession(req, res, next) {
    // console.log(req.cookies.auth_token);
    const { decodedAccessToken, accTokError } = verifyAccessToken(
        req.cookies.auth_token
    );

    // Check if there was an error
    if (accTokError) {
        // Check what kind of error
        if (accTokError.name == "TokenExpiredError") {
            // Expired Access Tokens need to be checked for refresh tokens
            const { decodedRefreshToken, refTokError } = verifyRefreshToken(
                req.cookies.refresh_token
            );

            if (refTokError) {
                // Clear Cookies, redirect to Sign In
                res.clearCookie("auth_token");
                res.clearCookie("refresh_token");
                res.redirect("/signin");
            } else {
                // Create new Auth Token, proceed to next
                // Payload
                const payload = {
                    email: decodedAccessToken.email,
                    role: decodedAccessToken.role,
                };
                const newAccessToken = createAccessToken(payload);
                res.cookie("auth_token", newAccessToken);
                next();
            }
        } else {
            // Invalid Tokens
            res.clearCookie("auth_token");
            res.clearCookie("refresh_token");
            res.redirect("/signin");
        }
    } else {
        if (checkUser(decodedAccessToken.email)) {
            next();
        } else {
            // Invalid Tokens
            res.clearCookie("auth_token");
            res.clearCookie("refresh_token");
            res.redirect("/signin");
        }
    }
}

// Password Hash
function passwordHash(string) {
    return crypto
        .createHmac("sha256", process.env.PASSWORD_KEY)
        .update(string)
        .digest("hex");
}

// Password Compare
function compareHash(storedPassword, givenPassword) {
    if (storedPassword === givenPassword) {
        return true;
    } else {
        return false;
    }
}

// Validate User
async function checkUser(email) {
    let user = await User.findOne({ email: email });
    if (user) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    createAccessToken,
    verifySession,
    createRefreshToken,
    verifyRefreshToken,
    passwordHash,
    compareHash,
};
