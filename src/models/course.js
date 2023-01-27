import { Schema, model } from "mongoose";
import CollectionNames from '../constants/collection'

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    shortDescription: String,
    longDescription: String,
    content: [{
        content: String
    }],
    required: [String],
    type: {
        type: String,
        enum: ['online', 'ofline']
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: CollectionNames.CourseCategory
    }],
    benefit: [String],
    schedule: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId, ref: CollectionNames.User
    },
    mentors: [{
        type: Schema.Types.ObjectId,
        ref: CollectionNames.User
    }]
}, {
    timestamps: true,
})

export const Course = model(CollectionNames.Course, courseSchema)
export default Course