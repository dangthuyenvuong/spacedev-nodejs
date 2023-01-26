import { Schema, model } from 'mongoose'

// Bảng mô tả model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true // Đảm bảo không có user nào trùng trong 1 collection
    },
    password: {
        type: String
    },
    name: String,
    avatar: String,
    phone: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    birthday: Date
})

// users: Tên của collection trong database
export const User = model('users', userSchema)
export default User