require("dotenv").config();
const express = require("express");
const workoutRoute = require("./routes/workoutRouter");
const mongoose = require("mongoose");

//express app
const app = express();

//middleware
app.use(express.json());

app.use("/", (req, res, next) => {
    console.log("path: " + req.path);
    console.log("method: " + req.method);
    next();
});

//route
app.use("/api/workouts", workoutRoute);

//connect to db

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        //listening to requstes
        app.listen(process.env.PORT, () => {
            console.log(
                "connected to mongodb  am running  on " + process.env.PORT + " port"
            );
        });
    })
    .catch((err) => console.error(err));
