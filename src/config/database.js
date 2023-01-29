import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";
import { paginate } from "../utils/paginate";
import { softDelete } from "../utils/softDelete";
config()
mongoose.set('strictQuery', false)
mongoose.set('strictPopulate', false)
// mongoose.set('toJSON', { virtuals: true, versionKey: false, transform: function (doc, ret) { delete ret._id } })
mongoose.connect(process.env.DATABASE_STRING, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connect to mongoDB')
    }
})

mongoose.plugin(paginate)
mongoose.plugin(softDelete)
