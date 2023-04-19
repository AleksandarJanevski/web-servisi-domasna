const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../../config.env` });

let DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('NAME', 'Prodavnica');

exports.init = async () => {
    try {
        await mongoose.connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database Connected');
    } catch (err) { console.err(err); }
};