const userModel = require('../pkg/UserModel/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body
        await userModel.create({
            email: email,
            password: password
        });
        res.status(200).json({ status: 'success' })
    } catch (err) {
        res.status(500).send('internal server error');
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('please provide email and password');
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send('invalid user or password');
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).send('invalid user or password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            secure: false,
            httpOnly: true,
        })
        res.status(200).json({ status: 'success', token });
    } catch (err) {
        console.error(err)
        return res.status(500).send('internal server error')
    }
};
