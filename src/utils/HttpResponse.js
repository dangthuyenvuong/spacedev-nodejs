import express from 'express'
import { ModelErrorCode } from './ModelErrorCode.js'

export class HttpResponse {

    static data(res, props) {
        res.json({ data: props })
    }

    static error(res, err, message = 'Bad request') {
        console.log(err)
        if (err?.constructor?.name === 'MongoServerError') {
            const errorObj = {}
            if (err.code === ModelErrorCode.UNIQUE) {
                errorObj[Object.keys(err.keyPattern).pop()] = 'Giá trị này đã tồn tại, vui lòng chọn giá trị khác'
            }
            return res.status(400).json({ error: errorObj, message })
        }

        return res.status(400).json({ error: err, message })
    }

    static delete(res, data) {
        if (data.deletedCount) {
            return res.status(204).json({ deletedCount: data.deletedCount })
        }

        return res.status(400).json({ error: 1, message: 'Data not exists' })
    }

    static update(res, data) {
        if (data?.matchedCount) {
            return res.status(200).json({ updatedCount: data.matchedCount })
        }

        return res.status(400).json({ error: 1, message: 'Data not exists' })
    }
}