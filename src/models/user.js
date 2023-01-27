import { Schema, model } from 'mongoose'
import CollectionNames from '../constants/collection'

// Bảng mô tả model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true, // Đảm bảo không có user nào trùng trong 1 collection,
        set: (v) => v.toLowerCase()
    },
    password: {
        type: String,
        select: false,
    },
    // name: String,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    avatar: String,
    phone: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    birthday: Date
}, {
    timestamps: true,
    virtuals: {
        name: {
            get() {
                return this.firstName + ' ' + this.lastName
            },
            set(v) {
                this.firstName = v.substring(0, v.indexOf(' '))
                this.lastName = v.substring(v.indexOf(' ') + 1)
            }
        }
    }
})

// users: Tên của collection trong database
export const User = model(CollectionNames.User, userSchema)
export default User