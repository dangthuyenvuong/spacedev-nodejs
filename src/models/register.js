import { Schema, model } from "mongoose";
import CollectionNames from "../constants/collection";

const registerSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.Course,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.User,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.Review,
        default: null
    }
}, {
    timestamps: true,
})

export const Register = model(CollectionNames.Register, registerSchema)
export default Register