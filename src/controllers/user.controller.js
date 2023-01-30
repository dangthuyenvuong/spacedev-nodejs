import md5 from 'md5'
import User from '../models/user'
import HttpResponse from '../utils/HttpResponse'
import mail from '../utils/mail'
import fs from 'fs'
import { randomBytes } from 'crypto'
import { EMAIL_DELAY } from '../constants/mail'
import { generateToken } from './auth.controller'
import { createController } from '../utils/createController'


const mailRegisterTemplate = fs.readFileSync('resources/mail/register.html').toString()
const mailForgotPasswordTemplate = fs.readFileSync('resources/mail/forgot-password.html').toString()

export const UserController = createController({
    getUser: async (req, res) => {
        const user = await User.findById(req.user._id)
        return user
    },
    register: async (req, res) => {
        const { username, password, name, redirect } = req.body

        const codeConfirm = randomBytes(64).toString('hex')
        const urlConfirm = `${req.protocol}://${req.get('host')}/user/register-confirm/${codeConfirm}`

        mail({
            to: username,
            subject: 'Xác nhận đăng ký tài khoản spacedev.vn',
            content: mailRegisterTemplate.replace({}),
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
            lastSendEmail: new Date(),
            confirmRedirect: redirect || req.get('origin')
        })
        return new HttpResponse('Tạo tài khoản thành công')
    },
    updateProfile: async (req, res) => {
        const { name, avatar, phone, gender, birthday } = req.body
        return User.findOneAndUpdate(
            { _id: req.user._id },
            { name, avatar, phone, gender, birthday }, { new: true }
        )
    },
    registerConfirm: async (req, res) => {
        const { code } = req.params
        const user = await User.findOne({
            codeConfirm: code
        }).select('confirmRedirect codeConfirm')

        if (user) {
            user.emailConfirm = true
            user.save()
            res.redirect(`${user.confirmRedirect}?code=${user.codeConfirm}`)
            return
        }

        throw new Error('Đã có lỗi xẩy ra')
    },
    resendEmail: async (req, res) => {
        const { username } = req.body

        let user = await User.findOne({ username })

        if (!user || user.emailConfirm) {
            throw new Error('Tài khoản này đã kích hoạt hoặc chưa đăng ký tài khoản')
        }

        let time = Math.floor((Date.now() - user.lastSendEmail) / 1000)

        if (time <= EMAIL_DELAY) {
            return new HttpResponse({
                status: 400,
                message: `Vui lòng quay lại trong ${EMAIL_DELAY - time} giây nữa`,
                data: { time: EMAIL_DELAY - time }
            })
        }


        const codeConfirm = randomBytes(64).toString('hex')
        const urlConfirm = `${req.protocol}://${req.get('host')}/user/register-confirm/${codeConfirm}`

        mail({
            to: username,
            subject: 'Xác nhận đăng ký tài khoản spacedev.vn',
            content: mailRegisterTemplate,
            data: {
                urlConfirm,
                username: username.toLowerCase(),
                password: ''.padStart(25, '*'),
            }
        })

        user.codeConfirm = codeConfirm
        user.lastSendEmail = new Date()
        await user.save()

        return new HttpResponse('Chúng tôi vừa gửi lại mail kích hoạt tài khoản cho bạn')
    },
    changePassword: async (req, res) => {
        const { currentPassword, newPassword } = req.body
        const result = await User.updateOne({
            _id: req.user._id,
            password: md5(currentPassword)
        }, {
            password: md5(newPassword)
        })

        if (result.modifiedCount) {
            return new HttpResponse('Thay đổi mật khẩu thành công')
        } else {
            throw new Error('Mật khẩu cũ không chính xác')
        }
    },
    resetPassword: async (req, res) => {
        const { username, redirect } = req.body
        const user = await User.findOne({ username, emailConfirm: true })

        if (!user) throw new Error('Tài khoản chưa đăng ký hoặc chưa được xác nhận qua email')

        let time = Math.floor((Date.now() - user.lastSendEmail) / 1000)

        if (time <= EMAIL_DELAY) {
            return new HttpResponse({
                status: 400,
                message: `Vui lòng quay lại trong ${EMAIL_DELAY - time} giây nữa`,
                data: { time: EMAIL_DELAY - time }
            })
        }

        const codeConfirm = randomBytes(64).toString('hex')

        mail({
            to: username,
            subject: 'Tìm lại mật khẩu tài khoản spacedev.vn',
            content: mailForgotPasswordTemplate,
            data: {
                href: `${redirect}?code=${codeConfirm}`
            }
        })

        user.codeConfirm = codeConfirm
        await user.save()

        return new HttpResponse('Gửi mail lấy lại mật khẩu thành công')
    },
    changePasswordByCode: async (req, res) => {
        const { code, password } = req.body
        const user = await User.findOneAndUpdate({
            codeConfirm: code
        }, {
            password: md5(password)
        })

        if (user) {
            const token = generateToken(user)
            user.codeConfirm = null
            await user.save()

            return token
        } else {
            throw new Error('Đã có lỗi xẩy ra, vui lòng thử lại')
        }
    },
    checkCode: async (req, res) => {
        const { code } = req.query
        if (await User.findOne({ codeConfirm: code })) {
            return new HttpResponse({ status: 200 })
        } else {
            return new HttpResponse({
                status: 404
            })
        }
    }
})