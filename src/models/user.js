import mongoose, { Schema } from "mongoose";
import { Course } from "./course";
import { Register } from "./register";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,

        // validate: {
        //     validator: (v) => {
        //         return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
        //     },
        //     message: props => `${props.value} không phải là email!`
        // }
    },
    phone: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: String,
    password: {
        type: String,
        select: false
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    }
}, {
    timestamps: true,
    virtuals: {
        // name: {
        //     get() {
        //         return this.firstName + ' ' + this.lastName
        //     },
        //     set(v) {
        //         this.firstName = v.substring(0, v.indexOf(' '))
        //         this.lastName = v.substring(v.indexOf(' ') + 1)
        //     }
        // }
    },
    methods: {
        theCourseBeingTaught() {
            return Course.find({ teacher: this._id })
        },
        courseBeingStudied() {
            return Register.find({ userId: this._id }).populate('courses')
        }
    },
    statics: {
        findByEmail(email) {
            return this.findOne({ username: email })
        }
    }
})
UserSchema.post('save', function (doc, next) {
    doc.password = undefined;
    next()
})

const User = mongoose.model('users', UserSchema)
export default User