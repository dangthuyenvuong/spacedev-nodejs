import { Schema, model } from "mongoose";
import CollectionNames from "../constants/collection";

const registerSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.Course,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.User,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export const Register = model(CollectionNames.Register, registerSchema)
export default Register