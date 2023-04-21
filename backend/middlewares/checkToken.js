const jwt = require('jsonwebtoken');
const SECRET_KEY = "final123"

module.exports.checkToken = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;
        if (!tokenHeader) throw new Error('No JWT found');

        const token = tokenHeader.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded) throw new Error('Access denied!');

        req.token = decoded
        next()
    } catch (e) {
        next(e);
    }
}