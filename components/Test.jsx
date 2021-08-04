require('dotenv').config()

export default function product(req, res) {
  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      type: 'OAUTH2',
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: process.env.OAUTH_ACCESS_TOKEN,
      expires: 3599
    },
    secure: true
  })

  const mailData = {
    from: 'devtestlouis@gmail.com',
    to: 'devchidera@gmail.com',
    subject: `Message From ${req.body.name}`,
    text: `This is an order on our website from${req.body.name}`,
    html: <div>{req.body}</div>
  }

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err)
    else console.log(info)
  })
  res.status(200)
}
