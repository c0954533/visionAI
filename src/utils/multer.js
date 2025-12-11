import multer from "multer";

const storage = multer.memoryStorage(); // store file in RAM buffer

export const upload = multer({ storage });
