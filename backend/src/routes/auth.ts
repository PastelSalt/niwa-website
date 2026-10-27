import { Router } from "express";
import {
  register,
  login,
  logout,
  me,
  refresh,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, me);
router.post("/refresh", refresh);

export default router;
