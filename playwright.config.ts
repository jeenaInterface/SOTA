import { defineConfig } from "@playwright/test";
import { OrtoniReportConfig } from "ortoni-report";

const reportConfig: OrtoniReportConfig = {
  port: 1994,
  open: "on-failure",
  folderPath: "report",
  filename: "index.html",
  logo: "logo.png",
  title: "Ortoni Test Report",
  showProject: false,
  projectName: "Ortoni-Report",
  testType: "Release - Oct 21, 2024",
  authorName: "Koushik (LetCode with Koushik)",
  preferredTheme: "light",
  base64Image: true,
};

export default defineConfig({
  reporter: [["ortoni-report", reportConfig], ["dot"]],
  // Other Playwright configurations
});