import { analyzeImageRekognition } from "../services/rekognitionService.js";
import { saveHistory } from "../services/dynamoService.js";
import { v4 as uuidv4 } from "uuid";

export const analyzeImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const buffer = req.file.buffer;

        // Step 1: Analyze with Rekognition
        const labels = await analyzeImageRekognition(buffer);

        // Step 2: Create DynamoDB record
        const record = {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            labels: labels,
        };

        // Step 3: Save to DynamoDB
        await saveHistory(record);

        return res.json({
            message: "Image analyzed and saved successfully",
            labels,
            recordId: record.id
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
