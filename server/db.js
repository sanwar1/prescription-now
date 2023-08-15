const mongoose = require("mongoose");
const db = process.env.ATLAS_DB;

async function connectAtlas() {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Atlas connected!");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectAtlas;
