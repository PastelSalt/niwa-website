import { Router } from "express";
import {
  createItem,
  getItem,
  updateItem,
  deleteItem,
  getChildren,
  getTree,
  moveItem,
  archiveItem,
  restoreItem,
} from "../controllers/items.controller.js";
import { authenticate } from "../middleware/auth.js";

const router: Router = Router();

router.use(authenticate);

router.post("/", createItem);
router.get("/:itemId", getItem);
router.patch("/:itemId", updateItem);
router.delete("/:itemId", deleteItem);
router.get("/:itemId/children", getChildren);
router.get("/:itemId/tree", getTree);
router.post("/:itemId/move", moveItem);
router.post("/:itemId/archive", archiveItem);
router.post("/:itemId/restore", restoreItem);

export default router;
