
const tokens = [
    'spacedev',
    'spacedev-nodejs'
]
export const tokenHanller = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) return res.status(401).send('Unauthorized')

    const token = authorization.split('Bearer ').pop()
    if (tokens.includes(token)) {
        next()
    } else {
        res.status(403).send('Forbidden')
    }
}