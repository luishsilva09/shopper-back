import { Router } from "express";
import productRoutes from "./productRoutes";

const routes = Router();

routes.use(productRoutes);

export default routes;
