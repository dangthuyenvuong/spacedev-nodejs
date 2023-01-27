import TaskCategory from "../models/task_category";
import HttpResponse from "../utils/HttpResponse";

export const CategoryController = {
    getCategories: async (req, res) => {
        HttpResponse.data(res, await TaskCategory.find().select('-__v'))
    },
    createCategory: async (req, res) => {
        try {
            const { name, color } = req.body
            const category = {
                name,
                color
            }

            HttpResponse.data(res, await TaskCategory.create(category))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params
            const { name, color } = req.body

            const category = await TaskCategory.updateOne({ id }, { name, color })
            HttpResponse.update(res, category)
        } catch (err) {
            HttpResponse.error(res, err)
        }
    }
}