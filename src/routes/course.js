import { Router } from "express";
import validator from '../middlewares/validator'

const courseRouter = Router()

const createCourseRule = {}

const updatecourseRule = {}

courseRouter.get('', () => { })
courseRouter.get('/:id', () => { })
courseRouter.post('', validator(createCourseRule), () => { })
courseRouter.patch('/:id', validator(updatecourseRule), () => { })
courseRouter.delete('/:id', () => { })