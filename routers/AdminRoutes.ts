import express from "express";
import {
  changePassword,
  createAdmins,
  deleteAdmins,
  getAdmins,
  getOneAdmins,
  resetMail,
  signin,
  updateAdmins,
  verifyAdmins,
} from "../controller/AdminController";
import { validator } from "../utils/validatorHandle";

const router = express.Router();

router.route("/").get(getAdmins);

router.route("/:id/get-one").get(getOneAdmins);

router.route("/:id/update-info").patch(updateAdmins);

router.route("/:id/delete-account").delete(deleteAdmins);

router.route("/create").post(createAdmins);

router.route("/:id/:token/verify").get(verifyAdmins);

router.route("/reset-password").patch(resetMail);
router.route("/:id/:token/change-password").patch(changePassword);

router.route("/signin").post(signin);

export default router;
