import morgan from 'morgan'


export const getJson = (req, res, next) => {
    const oldJson = res.json.bind(res);
    res.json = (data) => {
        // Lấy dữ liệu từ res.json và lưu vào biến
        res.jsonBody = data;
        oldJson(data);
    };

    next();
}

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body, null, 4)
})


morgan.token('response', (req, res) => {
    return JSON.stringify(res.jsonBody, null, 4)
})

morgan.token('user', (req, res) => {
    return req.user?._id || ''
})