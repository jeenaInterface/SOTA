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



