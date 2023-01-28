import mongoose from "mongoose";
import { config } from "dotenv";
config()
mongoose.set('strictQuery', false)
mongoose.set('strictPopulate', false)
mongoose.connect(process.env.DATABASE_STRING, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connect to mongoDB')
    }
})

mongoose.plugin(function (schema, options) {

    schema.query.paginate = async function (page, limit) {

        const [data, count] = await Promise.all([
            this,
            this.clone().count()
        ])
        let paginate = {
            currentPage: parseInt(page),
            perPage: parseInt(limit),
            count,
            totalPage: Math.ceil(count / limit)
        }

        return { data, paginate }
    }

})
const originalPopulate = mongoose.Query.prototype.populate

mongoose.Query.prototype.populate = function (...args) {
    if (args.length >= 2) {
        return originalPopulate.call(this, ...args)
    }

    let collections = args[0].split(',')
    const regex = /\(([^)]+)\)/
    let result = this
    for (let i in collections) {
        const match = collections[i].match(regex);
        let select = match?.[1]
        let name = collections[i].replaceAll(`(${select})`, '')

        result = originalPopulate.call(this, name, select)
    }
    return this
}

const originalSort = mongoose.Query.prototype.sort

mongoose.Query.prototype.sort = function (...args) {
    if (typeof args[0] === 'string') {
        let sort = args[0].split(',')
        const sumSort = {}
        for (let i in sort) {
            let temp = sort[i].split('.')
            sumSort[temp[0]] = temp[1] === 'desc' ? -1 : 1
        }
        originalSort.call(this, sumSort)
    }else {
        originalSort.call(this, ...args)
    }

    return this
}