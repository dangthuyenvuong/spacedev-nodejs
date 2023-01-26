import User from '../models/user'

export const UserController = {
    getUser: async (req, res) => {
        try {
            const user = await User.find()
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(403).send(err.toString())
        }
    },
    register: async (req, res) => {
        try {
            const { username, password, name } = req.body
            const user = await User.create({ username, password, name })
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(403).send(err.toString())
        }
    },
    updateProfile: async (req, res) => {
        try {
            const user = await User.updateOne({ _id: req.params.id }, req.body)
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(403).send(err.toString())
        }
    }
}