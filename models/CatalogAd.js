const {Schema, model, Types} = require(`mongoose`)

const schema = new Schema({
    author: {type: Types.ObjectId, ref: `User`},
    title: {type: String, required: true},
    text: {type: String, required: true},
    price: {type: String},
    phone: {type: String, required: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0}
})

module.exports = model(`Catalog`, schema)