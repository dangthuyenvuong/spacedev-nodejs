import { ACCESS_TOKEN_KEY } from "../constants/token"
import jwt from 'jsonwebtoken'

export const authGuard = (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) return res.status(401).send('Unauthorized')

        const token = authorization.split('Bearer ').pop()
        // Giải mã token thành payload
        const payload = jwt.verify(token, ACCESS_TOKEN_KEY)
        req.user = payload
        next()

    } catch (err) {
        res.status(403).json({ errors: err })
    }
}

export default authGuard