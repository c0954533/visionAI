import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
},
});

export const uploadToS3 = async (fileBuffer, fileName, mimeType) => {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: mimeType,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`;
};
