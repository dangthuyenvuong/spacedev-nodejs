import { Router } from "express";
import validator from '../middlewares/validator'
import { CourseController } from "../controllers/course.controller";
import { required } from "../utils/validate";
import authGuard from '../middlewares/authGuard'

const courseRouter = Router()

const createCourseRule = {
    name: [required()],
    price: [required()],
    shortDescription: [required()]
}

const updatecourseRule = {}


courseRouter.get('/enrollments', authGuard, CourseController.enrollments)
courseRouter.get('', CourseController.getCourse)
courseRouter.get('/:id', CourseController.getOneCourse)
courseRouter.post('/register/:id', authGuard, CourseController.register)


// Author
courseRouter.post('', authGuard, validator(createCourseRule), CourseController.createCourse)
courseRouter.patch('/:id', authGuard, validator(updatecourseRule), CourseController.updateCourse)
courseRouter.delete('/:id', authGuard, CourseController.deleteCourse)



export default courseRouter