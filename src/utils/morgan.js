import morgan from 'morgan'

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body, null, 4)
})


morgan.token('response', (req, res) => {
    return JSON.stringify(res.jsonBody, null, 4)
})

morgan.token('user', (req, res) => {
    return req.user?._id || ''
})