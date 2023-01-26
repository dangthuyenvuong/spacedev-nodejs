export const errorMiddleware = (error, req, res, next) => {
    console.log('errorMiddleware')
    if (error) {
        if (error instanceof Error) {
            return res.status(403).json({ error: error.message })
        }
        return res.status(500).send(error)
    }
    next()
}