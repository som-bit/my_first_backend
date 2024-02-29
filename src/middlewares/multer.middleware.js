//express in itself cannot handle flies we need third party packages like multer

import multer from "multer";



// the code you provided is configuring a storage engine for file uploads using multer,
//a middleware for handling multipart / form - data.In this case,
//the storage engine is specified as diskStorage, which means that files will be saved to the server's disk.



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //fieldname + '-' + uniqueSuffix
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage })

