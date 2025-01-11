const mongoose = require("mongoose");
require("dotenv").config()

const mongoUri = process.env.MONGODB

const initializeDatabase = async() => {
    try {
        const connection = await mongoose.connect(mongoUri)
        if (connection) {
            console.log('Database Connected');
        }
    } catch (error) {
        console.log("Could not connect DB", error)
    }

};

module.exports = { initializeDatabase };

// const mongoose = require("mongoose")
// require("dotenv").config()
// const mongoUri = process.env.MONGODB

// const initializeDatabase = async() => {

//     await mongoose.connect(mongoUri)
//         .then(() => console.log("Database connected."))
//         .catch((error) => console.log("An error occured while connecting database.", error))

// }

// // const initializeDatabase = async() => {
// //     try {

// //         const connection = await mongoose.connect(mongoUri)
// //         if (connection) {
// //             console.log("Db connected.")
// //         }
// //     } catch (error) {
// //         console.log("An error occured while connecting to db.", error)
// //     }
// // }

// // const initializeDatabase = async() => {
// //     if (!mongoUri) {
// //         console.error("MongoDB URI is not defined in environment variables.");
// //         process.exit(1); // Exit the application with an error
// //     }

// //     try {
// //         await mongoose.connect(mongoUri, {
// //             useNewUrlParser: true,
// //             useUnifiedTopology: true,
// //         });
// //         console.log("Database connected successfully.");
// //     } catch (error) {
// //         console.error("An error occurred while connecting to the database:", error.message);
// //         process.exit(1); // Exit the application with an error
// //     }
// // };

// module.exports = { initializeDatabase }