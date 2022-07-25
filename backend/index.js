const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors')

dotenv.config({ path: "./config.env" });

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => {
        console.log("connecting to database....");

        console.log(`mongoose connected with server: ${data.connection.host}`);
    });


app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser());


const user = require("./routes/userRoutes.js");
const todo = require("./routes/todoRoutes.js");

app.use("/api/", user);
app.use("/api/", todo);

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`server is working on http://localhost:${PORT}`);
});