import HttpResponse from "../utils/HttpResponse"
import Course from '../models/course'
export const CourseController = {
    getCourse: async (req, res) => {
        let { name, fields, sort = '_id.desc', limit = 10, page = 1, ...filter } = req.query
        const query = { ...filter }
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i'
            }
        }

        sort = sort.split('.')
        sort = { [sort[0]]: sort[1] === 'desc' ? -1 : 1 }

        // const count = await Course.count(query)
        // let paginate = {
        //     currentPage: page,
        //     perPage: limit,
        //     count,
        //     totalPage: Math.ceil(count / limit)
        // }


        // HttpResponse.paginate(res,
        //     Course.find(query).select(fields).sort(sort).limit(limit).skip((page - 1) * limit),
        //     paginate
        // )

        HttpResponse.paginate(
            res,
            Course.find(query).select(fields).sort(sort).paginate(page, limit),
        )
    },
    getOneCourse: (req, res) => {
        HttpResponse.data(res, Course.findById(req.params.id))
    },
    createCourse: (req, res) => {
        HttpResponse.data(res, Course.create(req.body))
    },
    updateCourse: (req, res) => {
        HttpResponse.update(res, Course.updateOne({ _id: req.params.id }, req.body))
    },
    deleteCourse: (req, res) => {
        HttpResponse.delete(res, Course.deleteOne({ _id: req.params.id }))
    },
}


