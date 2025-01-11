import { JWT_SECRET } from '../config/config.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 


export const authenticateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send('Authorization token required');
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(403).send('Invalid token');
        }
        // Fetch the user from the  , including 'avatar' and 'username'
        const user = await User.findById(decoded._id).select('avatar username');
        if (!user) {
            return res.status(404).send('User not found');
        }
        req.user = user; // Attach the user to req.user
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send('Request is not authorized');
    }
}
