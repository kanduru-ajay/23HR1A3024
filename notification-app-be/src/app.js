import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import notificationRoutes from "./routes/notification.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Campus Notification API Running"
    });
});

export default app;