"use client";
import axios from "axios";

export async function generateReport(data: any) {
  console.log("Generating mock PDF report for:", data);
    try {
    const res = await axios.post("/api/report", data, {
      headers: { "Content-Type": "application/json" },
      responseType: "text", 
    });

    // Open new tab and write the HTML
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(res.data);
      newWindow.document.close();
    } else {
      alert("Please allow pop-ups to view the report.");
    }
  } catch (err) {
    console.error("❌ Report generation failed:", err);
    alert("Failed to generate the report. Check console for details.");
  }
}
