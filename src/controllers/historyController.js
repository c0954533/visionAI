import { getHistoryFromDB } from "../services/dynamoService.js";

export const getHistory = async (req, res) => {
    try {
        const items = await getHistoryFromDB();
        return res.json(items);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
