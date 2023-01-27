import { Router } from "express";
import validator from '../middlewares/validator'
import { CourseController } from "../controllers/course.controller";
import { required } from "../utils/validate";

const courseRouter = Router()

const createCourseRule = {
    name: [required()],
    price: [required()],
    shortDescription: [required()]
}

const updatecourseRule = {}

courseRouter.get('', CourseController.getCourse)
courseRouter.get('/:id', CourseController.getOneCourse)


// Admin
courseRouter.post('/admin', validator(createCourseRule), CourseController.createCourse)
courseRouter.patch('/admin/:id', validator(updatecourseRule), CourseController.updateCourse)
courseRouter.delete('/admin/:id', CourseController.deleteCourse)

export default courseRouter