import { Router } from "express";
import {
  listWorkspaces,
  createWorkspace,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspace.controller.js";
import { authenticate } from "../middleware/auth.js";

const router: Router = Router();

router.use(authenticate);

router.get("/", listWorkspaces);
router.post("/", createWorkspace);
router.get("/:workspaceId", getWorkspace);
router.patch("/:workspaceId", updateWorkspace);
router.delete("/:workspaceId", deleteWorkspace);

export default router;
