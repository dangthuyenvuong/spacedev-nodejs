import { ModelErrorCode } from './ModelErrorCode'

export default class HttpResponse {

    static async data(res, props) {
        try {
            props = await props
            if (props) {
                res.json({ data: props })
            } else {
                this.error(res, undefined, 'Not found')
            }
        } catch (err) {
            console.log(err)
            this.error(res, undefined, 'Not found')
        }
    }

    static async paginate(res, paginate) {
        try {
            paginate = await paginate

            if (paginate) {
                res.json(paginate)
            } else {
                this.error(res, undefined, 'Not found')
            }
        } catch (err) {
            console.log(err)
            this.error(res, undefined, 'Not found')
        }
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

        if (err?.constructor?.name === 'CastError') {
            if (err.kind === 'ObjectId') {
                return res.status(400).json({ message: 'Dữ liệu không tồn tại' })
            }
        }

        if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
        }

        return res.status(400).json({ errors: err, message })
    }

    static async delete(res, data) {

        try {
            data = await data
            if (data.deletedCount) {
                return res.status(204).json({ deletedCount: data.deletedCount })
            }
        } catch (err) {
            return this.error(res, undefined, 'Data not exists')
        }

        return res.status(400).json({ message: 'Data not exists' })
    }

    static async update(res, data) {
        try {
            data = await data
            if (data?.matchedCount) {
                return res.json({ updatedCount: data.matchedCount })
            }
        } catch (err) {
            console.log(err)
            this.error(res, err)
        }

        return res.status(400).json({ message: 'Data not exists' })
    }
    static async message(res, message) {
        res.json({ message })
    }


    static async response(res, data) {
        try {
            data = await data
            if (data.matchedCount) {
                res.json({ updatedCount: data.matchedCount })
            } else if (data.deletedCount) {
                res.json({ deletedCount: data.deletedCount })
            } else if (data.paginate) {
                res.json(data)
            } else if (data instanceof HttpResponse) {
                if (data.status) res.status(data.status)
                res.json(data.toJSON())
            } else {
                res.json({ data })
            }
        } catch (err) {
            throw err
        }
    }


    constructor(options = { status, message, data }) {
        if (typeof options === 'string') {
            this.message = options
        } else {
            this.status = options.status
            this.message = options.message
            this.data = options.data
        }
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            data: this.data
        }
    }
}
