const {Router} = require(`express`)
const Catalog = require('../models/CatalogAd')
const config = require(`config`)
const auth = require("../midleware/auth.midleware")
const router = Router()
router.post(`/create`, auth, async (req, resp) => {
    try {
        const {title, text, price, phone} = req.body
        const newCatalogItem = new Catalog({author: req.userToken.userId, title, text, price, phone})
        await newCatalogItem.save()
        resp.status(210).json({newCatalogItem})
    } catch (e) {
        resp.status(500).json({message: "Не вышло , попробуйте позднее"})
    }
})
router.get(`/`, async (req, resp) => {
    try {
        const catalog = await Catalog.find()
        resp.json(catalog)
    } catch (e) {
        resp.status(500).json({message: "Не вышло , попробуйте позднее"})
    }
})
router.get(`/:id`, async (req, resp) => {
    try {
        const catalog = await Catalog.find({author: req.params.id})
        resp.json(catalog)
    } catch (e) {
        resp.status(500).json({message: "Не вышло , попробуйте позднее"})
    }
})
module.exports = router