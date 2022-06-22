const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const uuid = require("uuid");
const bucketName = "testmanan";
const accessKeyId = "";
const secretAccessKey = "";
const region = "ap-south-1";
const fileName = "./images/ss.png";

console.log(uuid.v4());

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

function uploadImage(file) {
    // const file = fs.readFileSync("");
    // console.log(file);

    const fileStream = fs.createReadStream("./" + file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.path,
    };
    return s3.upload(uploadParams).promise();
}

exports.uploadImage = uploadImage;
