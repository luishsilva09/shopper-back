import { Router } from "express";
import * as productController from "../controller/productController";
import multer from "multer";

const productRoutes = Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

productRoutes.post(
  "/sendFile",
  upload.single("file"),
  productController.validateFile
);

export default productRoutes;
