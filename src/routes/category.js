import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import validator from '../middlewares/validator';
import { required } from "../utils/validate";

const categoryRouter = Router()

const createCategoryRule = {
    name: [required()],
    color: [required()]
}

categoryRouter.get('', CategoryController.getCategories)

categoryRouter.post('', validator(createCategoryRule), CategoryController.createCategory)

categoryRouter.put('/:id', validator(createCategoryRule), CategoryController.updateCategory)

export default categoryRouter