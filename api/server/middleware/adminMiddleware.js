import { ROLES } from '../models/user.js';

export const checkAdminAccess = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.redirect('/login');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || decodedToken.role !== ROLES.ADMIN) {
                return res.redirect('/');
            }
            next();
        });
    } catch (error) {
        res.redirect('/');
    }
}; 