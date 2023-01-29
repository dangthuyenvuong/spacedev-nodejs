import { Router } from "express";
import uploadFile from "../utils/uploadFile";
import HttpResponse from '../utils/HttpResponse'

const fileRouter = Router()

fileRouter.post('/upload', uploadFile.array('files'), (req, res) => {
    if (req.files?.length) {
        HttpResponse.data(res, req.files.map(e => ({
            path: `${req.protocol}://${req.get('host')}/` + e.path.replace('resources\\','').replaceAll('\\','/'),
            size: e.size,
            mimetype: e.mimetype
        })))
    } else {
        HttpResponse.error(res, undefined, "Vui lòng upload ít nhất 1 file")
    }
})

export default fileRouter