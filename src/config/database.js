import mongoose from "mongoose";

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://127.0.0.1:27017/spacedev', () => {
    console.log('Connect to mongoDB')
})