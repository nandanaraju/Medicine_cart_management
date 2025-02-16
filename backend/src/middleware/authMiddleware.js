const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.cookies?.Authtoken || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        req.userType=decoded.userType;
        req.userId = decoded.userId;
        req.userEmail = decoded.email; 

        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.userType)) {
            return res.status(403).json({ error: "Access denied. Insufficient permissions." });
        }
        next();
    };
}

module.exports = { verifyToken, authorizeRoles };