import { HttpResponse } from "../utils/HttpResponse.js"
import { validate } from "../utils/validate.js"

export const createValidateHandler = (rules) => (req, res, next) => {
    const error = validate(rules, req.body)
    if (Object.keys(error).length === 0) {
        next()
    } else {
        HttpResponse.error(res, error)
    }
}