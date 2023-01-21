let user = [
    { username: 'dangthuyenvuong@gmail.com', name: "Đặng Thuyền Vương" }
]

const UserController = {
    getUser(req, res) {
        res.json(user)
    },
    newUser(req, res) {
        const { username, name } = req.body
        const f = user.find(e => e.username === username)
        if (f) {
            return res.status(400).json({ error: 'username đã tồn tại' })
        }
        user.push({ username, name })
        setTimeout(() => {
            res.json({ username, name })
        }, 3000)
    },
    deleteUser(req, res) {
        const { email } = req.params
        let i = user.findIndex(e => e.username === email)
        if (i !== -1) {
            user = user.filter(e => e.username !== email)
            return res.json({ message: 'Xóa user thành công' })
        } else {
            return res.status(400).json({ error: 'Email không tồn tại' })
        }
    },
    updateUser(req, res) {
        const { name } = req.body
        const { email } = req.params
        let f = user.find(e => e.username === email)
        if (f) {
            f.name = name
            return res.json({ message: 'Cập nhật thông tin thành công' })
        } else {
            return res.status(400).json({ message: 'Email không tồn tại' })
        }
    }
}

export default UserController