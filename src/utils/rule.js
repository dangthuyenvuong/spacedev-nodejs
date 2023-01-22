import { isEmail, required } from "./validate.js";

export const validateNewUser = {
    username: [
        required(),
        // pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        isEmail()
    ],
    name: [
        required('Vui lòng điền họ và tên'),
    ],
    password: [
        required()
    ]
}

export const validateLogin = {
    username: [
        required(),
        isEmail()
    ],
    password: [
        required()
    ]
}