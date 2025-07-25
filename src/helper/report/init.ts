// const fs = require("fs-extra");
// try {
//     fs.ensureDir("test-results");
//     fs.emptyDir("test-results");

// } catch (error) {
//     console.log("Folder not created! " + error);
// }

const fs = require("fs-extra");
const localReport = "test-results/cucumber-report.html";
const sharedReport = "C:\\Users\\jmanuel.SUYMIL\\OneDrive - Milestone Technologies Inc\\LBCT - Automation Practice\\Automation Reports\\test-results\\cucumber-report.html";

if (fs.existsSync(localReport)) {
    fs.copyFileSync(localReport, sharedReport);
    console.log("cucumber-report.html copied to shared folder.");
} else {
    console.log("Local cucumber-report.html not found!");
}