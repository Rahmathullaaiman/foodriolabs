const nodemailer = require('nodemailer');

// Create transporter object outside the handler function
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rahmathullaaiman@gmail.com',
        pass: 'agre uwao yvyi nory'
    }
});

// Function to generate a random OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generates a 6-digit OTP
}

// Function to send email with OTP
exports.sendEmail = async (req, res) => {
    try {
        const recipientEmail = req.body.recipientEmail;

        // Generate OTP
        const otp = generateOTP();

        // Email content with OTP
        const mailOptions = {
            from: 'rahmathullaaiman@gmail.com',
            to: recipientEmail,
            subject: 'Your OTP for verification',
            text: `Your OTP is: ${otp}` // Include OTP in the email body
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        if (res) {
            res.status(200).json({mailOptions});
        }
    } catch (error) {
        console.log('Error occurred:', error);
        if (res) {
            res.status(500).json('Error occurred while sending email');
        }
    }
};
