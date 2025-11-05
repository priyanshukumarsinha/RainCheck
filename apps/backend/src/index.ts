import express from "express";
import cors from "cors";

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  const response = { success: true, message: "Backend is healthy" };
  res.json(response);
});

// Mount the new route

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
