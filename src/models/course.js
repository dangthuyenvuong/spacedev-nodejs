import { Schema, model } from "mongoose";

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
        type: Schema.Types.ObjectId, ref: 'User'
    },
    mentors: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true,
})

export const Course = model('courses', courseSchema)
export default Course