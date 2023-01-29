const sendEmail = require('../utils/sendEmail');

exports.testEmail = async (req, res) => {

  let { email, subject, message } = req.body

  const preMessage = `
    <h1>Test Email</h1>
    <p>message from : ${email}</p>
    <p>${message}</p>
  `

  try {
    await sendEmail({
      to: 'kys3923@gmail.com',
      subject: subject,
      text: preMessage,
    })
    res.json({
      success: true,
      message: 'Eamil has sent out successfully'
    })
  } catch (e) {
    console.log(e)
  }
}