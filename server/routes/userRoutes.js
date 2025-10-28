// routes/userRoutes.js
import express from "express";
import { registerUser, loginUser ,updateUser,addAddress,updateAddress,deleteAddress} from "../controllers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.post("/:id/address", addAddress);
router.put("/:id/address", updateAddress);
router.delete("/:id/address", deleteAddress);

export default router;
