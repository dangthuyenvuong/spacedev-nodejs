import Member from "../models/member";
import { Router } from "express";
import { required } from "../utils/validate";
import validator from "../middlewares/validator";
import rule from 'validator'

const memberRouter = Router()
const createMemberRule = {
    name: [required()],
    avatar: [required()],
    email: [
        required(),
        (value) => {
            if (!rule.isEmail(value)) return 'Email phải đúng định dạng ví dụ: example@gmail.com'
        }
    ]
}

memberRouter.get('', (req, res) => {
    res.json(Member.find())
})

memberRouter.post('', validator(createMemberRule), (req, res) => {
    const { name, avatar, email } = req.body
    const member = {
        id: Date.now(),
        name,
        avatar,
        email
    }

    Member.create(member)
    res.json(member)
})

memberRouter.put('/:id', validator(createMemberRule), (req, res) => {
    const { id } = req.params
    const { name, avatar, email } = req.body

    const member = Member.updateById(id, { name, avatar, email })
    res.json(member)
})

export default memberRouter