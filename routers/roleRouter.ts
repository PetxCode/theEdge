import express from "express";
import {
  createRoles,
  updateUserRoles,
  updateUserRolesTitle,
  getUserRoles,
  removeUserRoles,
} from "../controller/roleController";

const router = express.Router();

router.route("/:id/get-user-role").get(getUserRoles);

export default router;
