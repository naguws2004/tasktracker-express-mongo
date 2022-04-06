const sgMail = require("@sendgrid/mail")
const sgKey = ""

const emailService = (emailId, subject, text) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || sgKey)
    const emailMessage = {
        to: emailId,
        from: "nageshkumar.y@gmail.com",
        subject: subject,
        html: "<strong>" + text + "</strong>"
    }
    sgMail.send(emailMessage)
}

module.exports = emailService