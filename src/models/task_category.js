import { Schema, model } from "mongoose";

const taskCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    }
})

export const TaskCategory = model('task_categories', taskCategorySchema)
export default TaskCategory

// import fs from 'fs'


// let categories = []


// const init = () => {
//     try {
//         const taskData = fs.readFileSync('./src/models/categories.json')
//         categories = JSON.parse(taskData.toString())
//     } catch (err) {

//     }
// }


// const writeFile = () => {
//     fs.writeFileSync('./src/models/categories.json', JSON.stringify(categories, null, 4))
// }

// init()


// const find = () => {
//     return categories
// }

// const findById = (id) => {
//     return categories.find(e => e.id === parseInt(id))
// }

// const create = (category) => {
//     categories.push(category)
//     writeFile()
//     return true
// }

// const deleteById = (id) => {
//     const index = categories.findIndex(e => e.id === parseInt(id))
//     if (index !== -1) {
//         categories.splice(index, 1)
//         writeFile()
//         return true
//     } else {
//         return false
//     }
// }

// const updateById = (id, updateData) => {
//     const index = categories.findIndex(e => e.id === parseInt(id))
//     if (index !== -1) {
//         const updateTask = {
//             ...categories[index],
//             ...updateData
//         }
//         categories[index] = updateTask
//         writeFile()
//         return updateTask
//     } else {
//         return false
//     }
// }

// export const Category = {
//     find, findById, create, deleteById, updateById
// }

// export default Category
