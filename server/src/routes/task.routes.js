import express from "express";
import { body } from "express-validator";
import {
  create,
  getAll,
  update,
  remove
} from "../controllers/task.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

const router = express.Router();

router.use(protect);

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Task title is required"),
    body("status")
      .optional()
      .isIn(["pending", "completed"])
      .withMessage("Invalid status")
  ],
  validate,
  create
);

router.get("/", getAll);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
