import Category from "../models/category";
import { Router } from "express";

const categoryRouter = Router()

categoryRouter.get('', (req, res) => {
    res.json(Category.find())
})

categoryRouter.post('', (req, res) => {
    const { name, color } = req.body
    const category = {
        id: Date.now(),
        name,
        color
    }

    Category.create(category)
    res.json(category)
})

categoryRouter.put('/:id', (req, res) => {
    const { id } = req.params
    const { name, color } = req.body

    const category = Category.updateById(id, { name, color })
    res.json(category)
})

export default categoryRouter