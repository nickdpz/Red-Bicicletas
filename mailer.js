const nodemailer = require('nodemailer');

let mailConfig;

if (process.env.NODE_ENV === "production") {
    mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.USER_PASSWORD
        }
    };
} else {
        mailConfig = {
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: 'jett.jerde53@ethereal.email',
                pass: 'nVPGpR4rX4X89dKtE3'
            },
        };
}
const sgTransport = nodemailer.createTransport(mailConfig);

module.exports = sgTransport;