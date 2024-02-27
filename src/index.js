//require('dotenv').config({ path: './env' })

import dotenv from "dotenv"
import connectDB from "./db/db_index.js";
import { app } from "../src/app.js"


dotenv.config({
    path: "./env"
})


connectDB()
    .then(() => {

        app.on("error", (error) => {
            console.log("EXPRESS ERROR: ", error);

        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`SERVER IS RUNNING AT PORT:${process.env.PORT} `);
        })
    })
    .catch((error) => {
        console.log("MONGO_DB CONNECT ERROR: ", error);
    })



































/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/