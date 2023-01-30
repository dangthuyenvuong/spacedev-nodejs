export const jsonBody = (req, res, next) => {
    const oldJson = res.json.bind(res);
    res.json = (data) => {
        // Lấy dữ liệu từ res.json và lưu vào biến
        res.jsonBody = data;
        oldJson(data);
    };

    next();
}