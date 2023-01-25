import fs from 'fs'


let members = []

const init = () => {
    try {
        const taskData = fs.readFileSync('./src/models/members.json')
        members = JSON.parse(taskData.toString())
    } catch (err) {

    }
}

const writeFile = () => {
    fs.writeFileSync('./src/models/members.json', JSON.stringify(members, null, 4))
}

init()


const find = () => {
    return members
}

const findById = (id) => {
    return members.find(e => e.id === parseInt(id))
}

const create = (member) => {
    members.push(member)
    writeFile()
    return true
}

const deleteById = (id) => {
    const index = members.findIndex(e => e.id === parseInt(id))
    if (index !== -1) {
        members.splice(index, 1)
        writeFile()
        return true
    } else {
        return false
    }
}

const updateById = (id, updateData) => {
    const index = members.findIndex(e => e.id === parseInt(id))
    if (index !== -1) {
        const updateTask = {
            ...members[index],
            ...updateData
        }
        members[index] = updateTask
        writeFile()
        return updateTask
    } else {
        return false
    }
}

export const Member = {
    find, findById, create, deleteById, updateById
}

export default Member