require("dotenv").config({ path: "./config/.env" });
const createServer = require("./server/app");
const connectAtlas = require("./server/db");
const app = createServer();

// Start the server
app.listen(process.env.NODEPORT, async () => {
    console.log(
        `Server is running on http://localhost:${process.env.NODEPORT}`
    );
    console.log(`Connecting to MongoDB Atlas...`);
    connectAtlas();
});
