const sgMail = require("@sendgrid/mail")
const AESCrypt = require('./crypto')
require('dotenv').config();

const key = process.env.SENDGRID_API_KEY
const sgKey = AESCrypt.decrypt(key)

const emailService = (emailId, subject, text) => {
    console.log(sgKey)
    sgMail.setApiKey(sgKey)
    const emailMessage = {
        to: emailId,
        from: "nageshkumar.y@gmail.com",
        subject: subject,
        html: "<strong>" + text + "</strong>"
    }
    sgMail.send(emailMessage)
}

module.exports = emailService
