import nodemailer, { Transporter } from 'nodemailer'

class SendMailService {
  private client: Transporter

  constructor () {
    nodemailer.createTestAccount()
      .then((account: nodemailer.TestAccount) => {
        console.log('Credentials obtained, sending message...')

        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter
      })
      .catch((err: Error) => {
        console.error('Failed to create a testing account. ' + err.message)
        return process.exit(1)
      })
  }

  async execute (to: string, subject: string, body: string) {
    const message = {
      to,
      subject,
      html: body,
      from: 'NPS <noreply@nps.com.br>'
    }

    await this.client.sendMail(message, (err, info) => {
      if (err) {
        console.log('Error occurred. ' + err.message)
        return process.exit(1)
      }

      console.log('Message sent: %s', info.messageId)
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    })
  }
}

export default new SendMailService()
