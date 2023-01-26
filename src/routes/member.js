import { Router } from "express";
import { required } from "../utils/validate";
import validator from "../middlewares/validator";
import rule from 'validator'
import { MemberController } from "../controllers/member.controller";

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

memberRouter.get('', MemberController.getMember)

memberRouter.post('', validator(createMemberRule), MemberController.createMember)

memberRouter.put('/:id', validator(createMemberRule), MemberController.updateMember)

export default memberRouter