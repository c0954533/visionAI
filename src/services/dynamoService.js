import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
}
,
});

const dynamo = DynamoDBDocumentClient.from(client);

export const saveHistory = async (item) => {
    const params = {
        TableName: process.env.DYNAMO_TABLE,
        Item: item,
    };

    await dynamo.send(new PutCommand(params));
    return { message: "History saved" };
};

export const getHistoryFromDB = async () => {
    const params = {
        TableName: process.env.DYNAMO_TABLE,
    };

    const result = await dynamo.send(new ScanCommand(params));
    return result.Items;
};
