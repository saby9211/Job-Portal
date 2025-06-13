// index.js
import express from "express";
import cookieParser from "cookie-parser";
import cors         from "cors";
import dotenv       from "dotenv";
import connectDB    from "./utils/db.js";
import userRoute    from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute     from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// ─── CORS MIDDLEWARE ────────────────────────────────────────────────────────────
// Move this *before* any body‑parser or routes.
app.use(cors({
  origin: "*",               // Allow all origins
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  credentials: false         // no cookies/auth headers with '*'
}));

// Make sure preflight OPTIONS are handled by CORS
app.options("*", cors({
  origin: "*"
}));

// ─── BODY PARSERS & COOKIES ─────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── ROUTES ─────────────────────────────────────────────────────────────────────
app.use("/api/v1/user",        userRoute);
app.use("/api/v1/company",     companyRoute);
app.use("/api/v1/job",         jobRoute);
app.use("/api/v1/application", applicationRoute);

// ─── START SERVER ───────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
