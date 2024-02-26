import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MONGO_DB CONNECTED DB HOST: ${connectionInstance.connection.host} `)
    }
    catch (error) {

        console.error("MONGO_DB_CONNECTION_ERROR: ", error);
        process.exit(1);
    }
}


export default connectDB