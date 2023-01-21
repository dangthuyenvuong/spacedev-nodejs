import mongoose, { Schema } from "mongoose";

const registerSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    price: {
        type: Number
    }
}, { timestamps: true })

export const Register = mongoose.model('registers', registerSchema)