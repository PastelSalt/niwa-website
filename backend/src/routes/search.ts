import { Router } from "express";
import { searchItems } from "../controllers/search.controller";
import { authenticate } from "../middleware/auth";

const router: Router = Router();

router.use(authenticate);

router.get("/", searchItems);

export default router;
