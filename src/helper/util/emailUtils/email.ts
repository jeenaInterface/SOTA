import * as nodemailer from 'nodemailer';
 
 
async function sendEmail() {
  try {
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
      text: `Hi,

Please find attached the test report.

From
QA team`,
      attachments: [
        {
          filename: 'cucumber-report.html',
          path: '/SOTA-AUTOMATION/test-results/cucumber-report.html',
        },
      ],
    };
 
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
}
 
sendEmail().catch(console.error);