import nodemailer from 'nodemailer'
import { MAIL_PASSWORD, MAIL_USER } from '../constants/mail';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: 1025,
    // secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    }
});





export const mail = async ({ content, data = {}, ...mailOptions }) => {
    try {
        for (let i in data) {
            content = content.replaceAll(`##${i}##`, data[i])
        }

        let res = await transporter.sendMail({
            ...mailOptions,
            html: content
        })
        console.log(res.response)
        return res
    } catch (err) {
        throw err
    }
}
export default mail