import Member from "../models/member";
import { Router } from "express";

const memberRouter = Router()

memberRouter.get('', (req, res) => {
    res.json(Member.find())
})

memberRouter.post('', (req, res) => {
    const { name, avatar } = req.body
    const member = {
        id: Date.now(),
        name,
        avatar
    }

    Member.create(member)
    res.json(member)
})

memberRouter.put('/:id', (req, res) => {
    const { id } = req.params
    const { name, avatar } = req.body

    const member = Member.updateById(id, { name, avatar })
    res.json(member)
})

export default memberRouter