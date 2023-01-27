import { ModelErrorCode } from './ModelErrorCode'

export default class HttpResponse {

    static data(res, props) {
        res.json({ data: props })
    }

    static error(res, err, message = 'Bad request') {
        if (err?.constructor?.name === 'MongoServerError') {
            const errorObj = {}
            if (err.code === ModelErrorCode.UNIQUE) {
                const key = Object.keys(err.keyPattern).pop()
                errorObj[key] = 'Giá trị này đã tồn tại, vui lòng chọn giá trị khác'
                message = `${key} đã tồn tại, vui lòng chọn giá trị khác`
            }
            return res.status(400).json({ errors: errorObj, message })
        }

        return res.status(400).json({ errors: err, message })
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