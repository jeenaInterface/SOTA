import * as nodemailer from 'nodemailer';
 
 
async function sendEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'jeena.manuel@milestone.tech',
        pass: 'Onboarding2025!',
      },
    });
 
    const mailOptions = {
      from: 'jeena.manuel@milestone.tech',
      to: 'jeena.manuel@milestone.tech',
      subject: 'Automation Test Report',
      text: 'Please find attached the test report.',
      attachments: [
        {
          filename: 'cucumber-report.html',
          path: '/SOTA-AUTOMATION/test-results/index.html',
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