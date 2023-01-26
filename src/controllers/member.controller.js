import Member from "../models/member";

export const MemberController = {
    getMember: (req, res) => {
        res.json(Member.find())
    },
    createMember: (req, res) => {
        const { name, avatar, email } = req.body
        const member = {
            id: Date.now(),
            name,
            avatar,
            email
        }

        Member.create(member)
        res.json(member)
    },
    updateMember: (req, res) => {
        const { id } = req.params
        const { name, avatar, email } = req.body

        const member = Member.updateById(id, { name, avatar, email })
        res.json(member)
    }
}