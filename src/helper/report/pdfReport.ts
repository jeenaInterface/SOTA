import * as reporter from 'multiple-cucumber-html-reporter';

export function generateHTMLReport() {
    reporter.generate({
        jsonDir: "test-results",
        reportPath: "./test-results/reports",
        metadata: {
            browser: {
                name: "chrome",
                version: "latest"
            },
            device: "Local Machine",
            platform: {
                name: "windows",
                version: "10"
            }
        },
        customData: {
            title: 'Test Execution Report',
            data: [
                { label: 'Project', value: 'SOTA Automation' },
                { label: 'Release', value: '1.0.0' },
                { label: 'Execution Date', value: new Date().toISOString().split('T')[0] }
            ]
        }
    });
}
