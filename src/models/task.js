import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'task_categories'
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'members',
        alias: 'demo'
    }],
    startAt: Date,
    endAt: Date
}, {
    timestamps: true,
    statics: {
        findTaskWithRelation() {
            return this.find().populate({ path: 'categories', select: '-__v' }).populate({path: 'members', select: '-__v'})
        }
    }
})

export const Task = model('tasks', taskSchema)
export default Task


// import fs from 'fs'
// import Category from './task_category'
// import Member from './member'


// let tasks = []


// const init = () => {
//     try {
//         const taskData = fs.readFileSync('./src/models/tasks.json')
//         tasks = JSON.parse(taskData.toString())
//     } catch (err) {

//     }
// }


// const writeFile = () => {
//     fs.writeFileSync('./src/models/tasks.json', JSON.stringify(tasks, null, 4))
// }

// init()


// const find = () => {
//     return tasks
// }

// const findById = (id) => {
//     const task = tasks.find(e => e.id === parseInt(id))
//     if (task) {
//         const taskTemp = { ...task }
//         if (Array.isArray(task.categories)) {
//             taskTemp.categories = taskTemp.categories.map(Category.findById)
//         }

//         if(Array.isArray(task.members)) {
//             taskTemp.members = taskTemp.members.map(Member.findById)
//         }

//         return taskTemp
//     }

//     return null
// }

// const create = (task) => {
//     tasks.push(task)
//     writeFile()
//     return true
// }

// const deleteById = (id) => {
//     const index = tasks.findIndex(e => e.id === parseInt(id))
//     if (index !== -1) {
//         tasks.splice(index, 1)
//         writeFile()
//         return true
//     } else {
//         return false
//     }
// }

// const updateById = (id, updateData) => {
//     const index = tasks.findIndex(e => e.id === parseInt(id))
//     if (index !== -1) {
//         const updateTask = {
//             ...tasks[index],
//             ...updateData
//         }
//         tasks[index] = updateTask
//         writeFile()
//         return updateTask
//     } else {
//         return false
//     }
// }

// export const Task = {
//     find, findById, create, deleteById, updateById
// }

// export default Task