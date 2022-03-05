const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dhiyailmamputra@gmail.com',
        pass: 'jxnbdmhaprdrrkyq'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter