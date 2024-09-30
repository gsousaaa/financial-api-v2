import nodemailer from 'nodemailer'

export const sendMail = async (email: string, subject: string, msg: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'financasappteste280@gmail.com',
                pass: 'tnth sirp dqut ulcd'
            }
        })

        await transporter.sendMail({
            to: email,
            subject,
            text: msg
        })

        return
    } catch (err) {
        throw err
    }
}