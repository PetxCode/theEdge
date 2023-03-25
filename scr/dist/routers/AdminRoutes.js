"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controller/AdminController");
const router = express_1.default.Router();
router.route("/").get(AdminController_1.getAdmins);
router.route("/:id/get-one").get(AdminController_1.getOneAdmins);
router.route("/:id/update-info").patch(AdminController_1.updateAdmins);
router.route("/:id/delete-account").delete(AdminController_1.deleteAdmins);
router.route("/create").post(AdminController_1.createAdmins);
router.route("/:id/:token/verify").get(AdminController_1.verifyAdmins);
router.route("/reset-password").patch(AdminController_1.resetMail);
router.route("/:id/:token/change-password").patch(AdminController_1.changePassword);
router.route("/signin").post(AdminController_1.signin);
exports.default = router;
//# sourceMappingURL=AdminRoutes.js.map