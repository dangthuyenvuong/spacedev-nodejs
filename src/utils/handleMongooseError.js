import { ModelErrorCode } from "./ModelErrorCode.js"

export const handleMongooseError = (err) => {
    const errorObj = {}
    if(err.code === ModelErrorCode.UNIQUE) {
        errorObj[Object.keys(err.keyPattern).pop()] = 'Giá trị này đã tồn tại, vui lòng chọn giá trị khác'
    }
    return errorObj
}