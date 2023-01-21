export const errorHandler = (error, req, res, next) => {
    console.error('error', error)
    if (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message })
        }
        return res.status(500).send(error)
    }
    next()
}