import { RekognitionClient, DetectLabelsCommand } from "@aws-sdk/client-rekognition";
import dotenv from "dotenv";

dotenv.config();

const rekognition = new RekognitionClient({
    region: process.env.AWS_REGION,
    credentials: {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
}
,
});

export const analyzeImageRekognition = async (buffer) => {
    const params = {
        Image: { Bytes: buffer },
        MaxLabels: 10,
        MinConfidence: 70,
    };

    const command = new DetectLabelsCommand(params);
    const response = await rekognition.send(command);

    return response.Labels;
};
