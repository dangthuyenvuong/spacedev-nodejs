import TaskCategory from "../models/task_category";
import HttpResponse from "../utils/HttpResponse";

export const CategoryController = {
    getCategories: async (req, res) => {
        const { name, ...filter } = req.query
        return TaskCategory.findAndPaginate({ ...filter, search: { name } })
    },
    createCategory: async (req, res) => {
        const { name, color } = req.body
        const category = {
            name,
            color
        }

        return TaskCategory.create(category)
    },
    updateCategory: async (req, res) => {
        const { id } = req.params
        const { name, color } = req.body

        return TaskCategory.updateOne({ id }, { name, color })
        
    }
}