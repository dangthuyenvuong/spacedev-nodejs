import { Schema, model } from "mongoose";
import CollectionNames from "../constants/collection";

const reviewSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.Course,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.User,
        required: true
    },
    registerId: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.Register,
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

export const Review = model(CollectionNames.Review, reviewSchema)
export default Review