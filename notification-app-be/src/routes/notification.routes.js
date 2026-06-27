import express from "express";
import {
    getNotifications,
    getPriorityNotifications
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", getNotifications);

router.get("/priority", getPriorityNotifications);

export default router;