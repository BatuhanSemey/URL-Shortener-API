const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true
    }
}, { timestamps: true })

const bdUrls = mongoose.model('url', urlSchema)

module.exports = bdUrls;