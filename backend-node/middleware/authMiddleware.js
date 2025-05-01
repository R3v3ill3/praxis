// backend-node/middleware/authMiddleware.js
import { auth as adminAuth } from '../firebase.js'; // Import initialized admin auth

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.warn('⚠️ Auth middleware: No Bearer token provided.');
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
        // Check if adminAuth is initialized
        if (!adminAuth) {
             console.error('❌ Auth middleware: Firebase Admin Auth not initialized.');
             throw new Error('Firebase Admin Auth not initialized.');
        }

        const decodedToken = await adminAuth.verifyIdToken(idToken);
        req.user = { // Attach user info to the request object
            uid: decodedToken.uid,
            email: decodedToken.email,
        };
        console.log(`✅ Auth middleware: User ${req.user.uid} authenticated.`);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('❌ Auth middleware: Invalid token.', error.message);
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
};

export default authMiddleware;
