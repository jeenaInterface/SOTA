const report = require("multiple-cucumber-html-reporter");

import { defineConfig } from "@playwright/test";
import { OrtoniReportConfig } from "ortoni-report";

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "SOTA Automation Report",
    pageTitle: "SOTA Test Report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "112",
        },
        device: "SUYCOKHWLAP303",
        platform: {
            name: "Windows",
            version: "10",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "SOTA Test Report" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "Sanity" }
        ],
    },
});
const reportConfig: OrtoniReportConfig = {
    port: 2004,
    open: "on-failure",       // Open report on failure
    folderPath: "ortoni-report/",     // Folder where the report will be saved
    filename: "index.html",   // Name of the report file
    logo: "logo.png",         // Optional logo for the report
    title: "Ortoni Test Report", // Report title
    showProject: false,       // Option to show project name
    projectName: "Ortoni-Report", // Project name
    testType: "Release - Oct 21, 2024", // Type of test
    authorName: "Koushik",    // Author name
    preferredTheme: "light",  // Theme for the report (light/dark)
    base64Image: true,        // Whether to use base64 encoded images
  };
  
  export default defineConfig({
    reporter: [
      ["ortoni-report", reportConfig], // Configure Ortoni report
      ["dot"], // Optionally, you can also use the dot reporter
    ],
    // Other Playwright configurations
  });



