import { Router } from "express";
import {
  getFocus,
  getFocusOverdue,
  getFocusUpcoming,
} from "../controllers/focus.controller.js";
import { authenticate } from "../middleware/auth.js";

const router: Router = Router();

router.use(authenticate);

router.get("/", getFocus);
router.get("/overdue", getFocusOverdue);
router.get("/upcoming", getFocusUpcoming);

export default router;
