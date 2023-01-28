import { MulterError } from "multer"

export const errorMiddleware = (error, req, res, next) => {

    if (error) {
        if (error instanceof MulterError) {
            return res.status(403).json({ error })
        }


        if (error instanceof Error) {
            return res.status(403).json({ error: error.message })
        }

        return res.status(500).send(error)
    }
    next()
}