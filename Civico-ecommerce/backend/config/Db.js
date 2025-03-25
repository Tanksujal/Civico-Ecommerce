const mongoose = require('mongoose')
const ConnectDB = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB Connected...')
    } catch (error) {
        console.log(error);
    }
}
module.exports = ConnectDB