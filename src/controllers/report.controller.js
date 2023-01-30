import HttpResponse from "../utils/HttpResponse"
import Report from '../models/report'

export const ReportController = {
    report: async (req, res) => {
        const { content, review } = req.body
        return Report.create({
            content,
            review
        })
    },
    getReport: async (req, res) => {
        return Report.findAndPaginate({
            ...req.query,
        })
    }
}

export default ReportController