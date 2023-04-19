const carModel = require('../pkg/CarsModel/carSchema');
const userModel = require('../pkg/UserModel/userSchema');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.verify = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).send('please log in to see content');
        }
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode.id)
        if (!user) {
            return res.status(400).send('user does not exist')
        }
        next();
    } catch (err) {
        console.error(err)
    }
}
exports.getCars = async (req, res) => {
    try {
        const cars = await carModel.find();
        res.status(200).json({ status: 'success', cars });
    } catch (err) {
        return res.status(500).send('internal server error');
    }
}
exports.addCars = async (req, res) => {
    try {
        await carModel.create(req.body)
        res.status(201).json({ status: 'success' });
    } catch (err) {
        return res.status(500).send('internal server error');
    }
}