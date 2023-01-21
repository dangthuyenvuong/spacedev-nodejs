import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    registerId: {
        type: Schema.Types.ObjectId,
        ref: 'registers'
    },
    content: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true,
})

export const Review = mongoose.model('reviews', reviewSchema)