import express from 'express';
import { analyzeImage } from '../controllers/analyzeController.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.post('/', upload.single("image"), analyzeImage);

export default router;
