var nodeoutlook = require('nodejs-nodemailer-outlook')

function sendEmail (email, message, attachment = null) {
  try {
    nodeoutlook.sendEmail({
      auth: {
        user: process.env.OUTLOOK_SENDER_EMAIL,
        pass: process.env.OUTLOOK_SENDER_PASSWORD
      },
      from: process.env.OUTLOOK_SENDER_EMAIL,
      to: email,
      subject: 'Important mail , please check',
      html: message,
      attachments:attachment,
      onError: e => console.log({ nodemailersuccess: e }),
      onSuccess: i => console.log({ nodemailerfail: i })
    })
  } catch (error) {
    console.log({ Sending_email_error: error })
  }
}

module.exports = sendEmail
