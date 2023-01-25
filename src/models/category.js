import fs from 'fs'


let categories = []


const init = () => {
    try {
        const taskData = fs.readFileSync('./src/models/categories.json')
        categories = JSON.parse(taskData.toString())
    } catch (err) {

    }
}


const writeFile = () => {
    fs.writeFileSync('./src/models/categories.json', JSON.stringify(categories, null, 4))
}

init()


const find = () => {
    return categories
}

const findById = (id) => {
    return categories.find(e => e.id === parseInt(id))
}

const create = (task) => {
    categories.push(task)
    writeFile()
    return true
}

const deleteById = (id) => {
    const index = categories.find(e => e.id === parseInt(id))
    if (index !== -1) {
        categories.splice(index, 1)
        writeFile()
        return true
    } else {
        return false
    }
}

const updateById = (id, updateData) => {
    const index = categories.findIndex(e => e.id === parseInt(id))
    if (index !== -1) {
        const updateTask = {
            ...categories[index],
            ...updateData
        }
        categories[index] = updateTask
        writeFile()
        return updateTask
    } else {
        return false
    }
}

export const Category = {
    find, findById, create, deleteById, updateById
}

export default Category