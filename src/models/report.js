import { Schema, model } from "mongoose";
import CollectionNames from "../constants/collection";

const reportSchema = new Schema({
    content: {
        type: String,
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.Review
    }
}, { timestamps: true })

export const Report = model(CollectionNames.Report, reportSchema)

export default Report