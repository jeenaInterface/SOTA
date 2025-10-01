import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

async function sendEmail() {
  try {
    const sharedReportPath = 'C:\\Users\\jeena.manuel\\OneDrive - Milestone Technologies Inc\\LBCT - Automation Practice\\Automation Reports\\test-results\\cucumber-report.html';
    fs.copyFileSync('test-results/cucumber-report.html', sharedReportPath);
    // Add your actual OneDrive/SharePoint web link below
    const sharedReportWebUrl = 'https://milestn.sharepoint.com/:u:/r/sites/LBCT/Shared%20Documents/General/Automation%20Practice/Automation%20Reports/test-results/cucumber-report.html?csf=1&web=1&e=0hbgrC';

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'lbct.sa@milestone.tech',
        pass: 'Milestone@Dec24',
      },
    });

    const mailOptions = {
      from: 'lbct.sa@milestone.tech',
      to: 'jeena.manuel@milestone.tech',
      subject: 'SOTA Automation Test Report',
      html: `
        <p>Hi,</p>
        <p>Please find attached the test report.</p>
        <p><b>Shared report location:</b><br>
        <a href="${sharedReportWebUrl}">${sharedReportWebUrl}</a>
        </p>
        <p>From<br>QA team</p>
      `,
      // attachments: [
      //   {
      //     // filename: 'cucumber-report.html',
      //     // path: sharedReportPath,
      //   },
      // ],
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
}

sendEmail().catch(console.error);