import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    registerId: {
        type: Schema.Types.ObjectId,
        ref: 'registers',
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Review = model('reviews', reviewSchema)
export default Review