import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users.controller.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();

// GET method
router.get("/", getAllUsers);

// GET method
router.get("/user/:id", getUserById);

router.get("/me", protectRoute, (req, res) => {
  const user = req.user;

  res.status(200).json({ message: "My user data", data: user });
});

// POST method
router.post("/add", protectRoute, createUser);

// PUT method
router.put("/edit/:id", protectRoute, updateUser);

// PATCH method
router.patch("/patch/:id", protectRoute, updateUser);

// DELETE method
router.delete("/delete/:id", protectRoute, checkAdmin, deleteUser);

export default router;
