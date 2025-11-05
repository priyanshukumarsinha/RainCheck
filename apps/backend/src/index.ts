import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoute from "./routes/report.js"; // 👈 .js required in ESM!

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🧠 Backend Module System: ESM ✅");
});

app.use("/api/report", reportRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
