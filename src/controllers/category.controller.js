import Category from "../models/category";

export const CategoryController = {
    getCategories: (req, res) => {
        res.json(Category.find())
    },
    createCategory: (req, res) => {
        const { name, color } = req.body
        const category = {
            id: Date.now(),
            name,
            color
        }
    
        Category.create(category)
        res.json(category)
    },
    updateCategory: (req, res) => {
        const { id } = req.params
        const { name, color } = req.body
    
        const category = Category.updateById(id, { name, color })
        res.json(category)
    }
}