import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

import dentistRoutes from "./src/routes/dentist.routes.js";
import appointmentRoutes from "./src/routes/appointment.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

import errorHandler from "./src/middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://oroglee-dentist-appointment.netlify.app"],
  }),
);

connectDB();

app.use("/api/dentists", dentistRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
