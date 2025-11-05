import express from "express";
import fs from "fs";
import path from "path";

const reportRouter = express.Router();

reportRouter.get("/", (req, res) => {
  const report = req.body || {};

  // Load HTML template
  const templatePath = path.join(__dirname, "../templates/reportTemplate.html");
  const html = fs.readFileSync(templatePath, "utf-8");

  // Inject the data into the HTML
  const injectedHtml = html.replace(
    "</body>",
    `<script>window.REPORT_DATA = ${JSON.stringify(report)};</script></body>`
  );

  // Send back HTML
  res.setHeader("Content-Type", "text/html");
  res.send(injectedHtml);
});

export default reportRouter;
