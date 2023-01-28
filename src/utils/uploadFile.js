import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'resources/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const uploadFile = multer({
    storage,
    errorHandler: function (err, next) {
        console.log(err);
        next(err);
    },

})
export default uploadFile