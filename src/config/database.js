import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/spacedev', (err) => {
    if(err) {
        console.log(err)
    }else {
        console.log('Connect to mongoDB')
    }
})
