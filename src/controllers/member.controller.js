import Member from "../models/member";
import HttpResponse from "../utils/HttpResponse";

export const MemberController = {
    getMember: async (req, res) => {
        try {
            HttpResponse.data(res, await Member.find())
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    createMember: async (req, res) => {
        try {
            const { name, avatar, email } = req.body
            const member = {
                name,
                avatar,
                email
            }

            HttpResponse.data(res, await Member.create(member))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    updateMember: (req, res) => {
        try {
            const { id } = req.params
            const { name, avatar, email } = req.body

            HttpResponse.update(res, Member.updateOne({ id }, { name, avatar, email }))
        } catch (err) {
            HttpResponse.error(err)
        }
    }
}