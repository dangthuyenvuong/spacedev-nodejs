import Member from "../models/member";
import HttpResponse from "../utils/HttpResponse";

export const MemberController = {
    getMember: async (req, res) => {
        const { name, ...filter } = req.query
        return Member.findAndPaginate({
            ...filter,
            search: { name }
        })
    },
    createMember: async (req, res) => {
        const { name, avatar, email } = req.body
        const member = {
            name,
            avatar,
            email
        }

        return Member.create(member)
    },
    updateMember: (req, res) => {
        const { id } = req.params
        const { name, avatar, email } = req.body

        return Member.updateOne({ id }, { name, avatar, email })
    }
}