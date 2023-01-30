import HttpResponse from "./HttpResponse"

const higherOrderFn = (callback) => {
    return async (req, res, next) => {
        try {
            const result = await callback(req, res, next)
            if(result) {
                HttpResponse.response(res, result)
            }
        }catch(err) {
            HttpResponse.error(res, err)
        }
    }
}


export const createController = (controllers) => {
    for (const key of Object.getOwnPropertyNames(controllers)) {
        controllers[key] = higherOrderFn(controllers[key]);
    }
    return controllers
}