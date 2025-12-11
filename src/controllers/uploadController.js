import { uploadToS3 } from "../services/s3Service.js";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.file;
        const fileName = `${uuidv4()}.${file.mimetype.split("/")[1]}`;

        // Upload file to S3
        const imageUrl = await uploadToS3(file.buffer, fileName, file.mimetype);

        return res.json({
            message: "Image uploaded successfully",
            imageUrl,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
