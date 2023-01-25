import { validate } from "../utils/validate"

const validator = (rules) => (req, res, next) => {
    const errors = validate(rules, req.body)
    if (Object.keys(errors).length === 0) {
        next()
    } else {
        res.status(403).json({ errors })
    }
}
export default validator