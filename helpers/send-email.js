const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function sendVerificationEmail(email, token) {

    const url = `http://localhost:3001/api/users/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: `
            <h2>Email Verification</h2>
            <p>Click link below to verify:</p>
            <a href="${url}">${url}</a>
        `
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendVerificationEmail;