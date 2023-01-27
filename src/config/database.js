import mongoose from "mongoose";
import { config } from "dotenv";
config()

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