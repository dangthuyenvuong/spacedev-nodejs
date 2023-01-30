import { Router } from "express";
import { required } from "../utils/validate";
import validator from "../middlewares/validator";
import ReportController from "../controllers/report.controller";

const reportRouter = Router()
const createReportRule = {
    content: [required()],
}

reportRouter.post('', validator(createReportRule), ReportController.report)
reportRouter.get('', ReportController.getReport)

export default reportRouter