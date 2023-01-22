import { Router } from 'express'
import { CourseController } from '../controllers/course'

const courseRouter = Router()

courseRouter.get('', CourseController.get)
courseRouter.get('/:id', CourseController.getOne)
courseRouter.get('/register', CourseController.register)

export default courseRouter