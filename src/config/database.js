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

async function paginate(page, limit) {
    const [data, count] = await Promise.all([
        this.clone().limit(limit),
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

mongoose.plugin(function (schema, options) {

    schema.query.paginate = paginate
})

mongoose.Model.paginate = function (...args) {
    return paginate.call(this.find(), ...args)
}

mongoose.Model.findAndPaginate = function (options) {
    let { search, sort = '_id.desc', fields, limit = 10, page = 1, includes, ...filter } = options
    const query = { ...filter }
    if (search) {
        for (let i in search) {
            if (search[i]) {
                query[i] = {
                    $regex: search[i],
                    $options: 'i'
                }
            }
        }
    }


    return this.find(query).select(fields).sort(sort).populate(includes).paginate(page, limit)
}


const originalPopulate = mongoose.Query.prototype.populate

mongoose.Query.prototype.populate = function (...args) {
    if (args.length >= 2) {
        return originalPopulate.call(this, ...args)
    }
    if (args[0]) {
        let collections = args[0].split(',')
        const regex = /\(([^)]+)\)/
        let result = this
        for (let i in collections) {
            const match = collections[i].match(regex);
            let select = match?.[1]
            let name = collections[i].replaceAll(`(${select})`, '')

            result = originalPopulate.call(this, name, select)
        }
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
    } else {
        originalSort.call(this, ...args)
    }

    return this
}