var mongoose = require('mongoose')
const config = require('config')

mongoose.connect(config.get("Mongo_URI"), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Mongodb Connected'))
    .catch((error) => console.log(error))

module.exports = mongoose