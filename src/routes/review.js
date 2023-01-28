import { Router } from "express";
import authGuard from "../middlewares/authGuard";
import validator from "../middlewares/validator";
import { ReviewController } from "../controllers/review.controller";
import { minLength, minMax, required } from "../utils/validate";
const reviewRouter = Router()

const reviewRule = {
    star: [required(), minMax(1, 5)],
    content: [required(), minLength(20)]
}

reviewRouter.post('/:id', authGuard, validator(reviewRule), ReviewController.newReview)
reviewRouter.get('/:id', ReviewController.getReview)

export default reviewRouter