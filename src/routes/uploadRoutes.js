import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

// upload.single("image") → expect form field "image"
router.post('/', upload.single("image"), uploadImage);

export default router;
