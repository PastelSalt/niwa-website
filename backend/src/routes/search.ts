import { Router } from "express";
import { searchItems } from "../controllers/search.controller.js";
import { authenticate } from "../middleware/auth.js";

const router: Router = Router();

router.use(authenticate);

router.get("/", searchItems);

export default router;
