import multer from "multer";

// The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // destination is used to determine within which folder the uploaded files should be stored //  cb is callback
        cb(null, '/publec/temp')
    },
    filename: function (req, file, cb) { // filename is used to determine what the file should be named inside the folder.

        cb(null, file.originalname) // originalname is attribute which is basically the name that user given to filel 
    }
})

  export const upload = multer({ storage: storage })