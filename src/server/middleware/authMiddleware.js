import jwt from 'jsonwebtoken';
import { ROLES } from '../models/user.js';

export const requireAuth = () => {
    return (req, res, next) => {
        try {
            const token = req.cookies.jwt;
            
            if (!token) {
                return res.status(401).json({ error: 'Authentication required' });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({ error: 'Invalid token' });
                }
                req.user = decodedToken;
                next();
            });
        } catch (error) {
            res.status(401).json({ error: 'Authentication failed' });
        }
    };
};

// Check if user is admin
export const requireAdmin = (req, res, next) => {
    if (req.user?.role !== ROLES.ADMIN) {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

// Check if user is moderator or admin
export const requireModeratorOrAdmin = (req, res, next) => {
    if (![ROLES.ADMIN, ROLES.MODERATOR].includes(req.user?.role)) {
        return res.status(403).json({ error: 'Moderator or admin access required' });
    }
    next();
}; 