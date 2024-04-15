const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: "gmail",
    auth: {
       user: process.env["EMAIL_USERNAME"],
       pass: process.env["EMAIL_PASSWORD"],
    },
});