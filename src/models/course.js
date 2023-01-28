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
    content: [String],
    required: [String],
    type: {
        type: String,
        enum: ['online', 'ofline'],
        default: 'online'
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
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.User,
        // populate: {
        //     select: 'avatar firstName lastName'
        // }
    }
}, {
    timestamps: true,
    statics: {
        checkAuthor: async function (id, authorId) {
            const course = await this.findById(id)
            if (course) {
                if(course.author.equals(authorId)) {
                    return course
                }
                throw new Error('Bạn không có quyền trên khóa học này')
            } else {
                throw new Error('Khóa học không tồn tại')
            }
        }
    }
})

export const Course = model(CollectionNames.Course, courseSchema)
export default Course