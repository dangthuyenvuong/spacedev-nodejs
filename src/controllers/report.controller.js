import HttpResponse from "../utils/HttpResponse"
import Report from '../models/report'

export const ReportController = {
    report: async (req, res) => {
        try {
            const { content, review } = req.body
            HttpResponse.data(res, Report.create({
                content,
                review
            }))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    getReport: async (req, res) => {
        HttpResponse.paginate(res, 
            Report.findAndPaginate({
                ...req.query,
            })    
        )
    }
}

export default ReportController