const express = require("express");
const multer = require("multer");
const uuid = require("uuid");
const fs = require("fs");
const { uploadImage } = require("./sample");

const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + "." + file.originalname.split(".").pop());
    },
});

const upload = multer({ storage: storage });
app.post("/imagePost", upload.single("image"), async (req, res) => {
    // console.log(req.file);
    console.log("Your File is being uploaded");
    uploadImage(req.file).then((s3Res) => {
        console.log("file is uploaded");
        // console.log(s3Res);
        if (s3Res.Location) {
            fs.unlink("./" + req.file.path, (err) => {
                if (err == null) res.send("Image Uploaded SuccessFUlly");
                else console.log(err);
            });
        }
    });
});
app.get("*", (req, res) => {
    res.send("404");
});
app.listen(3000, () => {
    console.log("Server is runbn9ign on posr 3000");
});
