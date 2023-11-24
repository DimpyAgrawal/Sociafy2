const jwt = require('jsonwebtoken');
const User = require('../model/User.js');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });

    } 

    const token = authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("tfgyfg");
        
        const { email } = decoded; // Extract email from decoded token payload
        console.log(email);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        console.log("0gtujjjjjjjjjjjjj");
        console.log(user);
    //    req.token = token;
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Token is invalid' });
    }
};

module.exports = authenticateToken;
