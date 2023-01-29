import md5 from 'md5'
import User from '../models/user'
import HttpResponse from '../utils/HttpResponse'
import mail from '../utils/mail'
import fs from 'fs'
import { randomBytes } from 'crypto'


const mailTemplate = fs.readFileSync('resources/mail/register.html').toString()

export const UserController = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user._id)
            HttpResponse.data(res, user)
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    register: async (req, res) => {
        console.log(req.headers)
        try {
            const { username, password, name, redirect } = req.body

            const codeConfirm = randomBytes(64).toString('hex')
            const urlConfirm = `${req.protocol}://${req.get('host')}/user/register-confirm/${codeConfirm}`

            mail({
                to: username,
                subject: 'Xác nhận đăng ký tài khoản spacedev.vn',
                content: mailTemplate.replace({}),
                data: {
                    urlConfirm,
                    username: username.toLowerCase(),
                    password: ''.padStart(password.length, '*'),
                }
            })
            await User.create({
                username,
                password: md5(password),
                name,
                codeConfirm,
                confirmRedirect: `${redirect || req.get('origin')}?code=${codeConfirm}`
            })
            HttpResponse.message(res, 'Tạo tài khoản thành công')

        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    updateProfile: async (req, res) => {
        const { name, avatar, phone, gender, birthday } = req.body
        HttpResponse.data(res, User.findOneAndUpdate(
            { _id: req.user._id },
            { name, avatar, phone, gender, birthday }, { new: true }
        ))
    },
    registerConfirm: async (req, res) => {
        try {
            const { code } = req.params
            const user = await User.findOne({
                codeConfirm: code
            }).select('confirmRedirect')

            if(user) {
                user.emailConfirm = true
                user.save()
                return res.redirect(user.confirmRedirect)
            }

            throw new Error('Đã có lỗi xẩy ra')

        } catch (err) {
            HttpResponse.error(res, err)
        }
    }
}