import { Schema, model } from "mongoose";

const registerSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export const Register = model('registers', registerSchema)
export default Register