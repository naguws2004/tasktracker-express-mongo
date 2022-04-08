const sgMail = require("@sendgrid/mail")
const AESCrypt = require('./cryptoService')
const constants = require('../constants.json')

const emailService = (emailId, subject, text) => {
    const key = constants.SENDGRID_API_KEY
    const sgKey = AESCrypt.decrypt(key)
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
