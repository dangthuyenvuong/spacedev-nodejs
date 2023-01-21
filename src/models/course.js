import mongoose, { Schema } from "mongoose";

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
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    content: [
        {
            date: Date,
            content: String
        }
    ],
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
    methods: {
        students() {

        },
    }
})

export const Course = mongoose.model('courses', courseSchema)