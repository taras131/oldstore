const {Router} = require(`express`)
const bcrypt = require('bcrypt')
const {check, validationResult} = require(`express-validator`)
const jwt = require('jsonwebtoken');
const config = require(`config`)
const User = require('../models/User')
const router = Router()
router.post(
    `/register/`,
    [
        check(`email`, `Неккоректный ввод email`).isEmail(),
        check(`password`, `Неккоректный ввод email`).isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: "некореектные данные"})
            }
            const {email, name, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "пользователь с таким email уже существует"})
            }
            const hachedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, name, password: hachedPassword})
            console.log(user)
            await user.save()
            res.status(201).json({message: "Пользователь создан"})
        } catch (e) {
            res.status(500).json({message: "Не вышло , попробуйте позднее"})
        }
    })
router.post(
    `/login/`,
    [
        check(`email`, `Введите корректный email`).normalizeEmail().isEmail(),
        check(`password`, `Неккоректный ввод пароля`).exists()
    ],
    async (req, resp) => {
        console.log(`login`)
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return resp.status(400).json({errors: errors.array(), message: "некореектные данные привходе"})
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return resp.status(400).json({message: "Такого пользователя не существует"})
            }
            const isMatch = bcrypt.compare(password, user.password)
            if (!isMatch) {
                return resp.status(400).json({message: "Неверно имя пользователя или пароль"})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get(`jwtSecret`),
                {expiresIn: `1h`}
            )
            resp.json({ token,userId: user.id })
        } catch (e) {
            resp.status(500).json({message: "Не вышло , попробуйте позднее"})
        }
    })
router.get(`/users`, async (req,resp) =>{
    try{
        const users = await User.find()
        resp.json(users)
    } catch (e){
        resp.status(500).json({message: "Не вышло , попробуйте позднее"})
    }

})

module.exports = router