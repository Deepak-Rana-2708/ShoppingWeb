import jwt from 'jsonwebtoken'

const JWT_SECRET = "your-secret-key-here";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied : No Token Provided"
        });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired Token!"
            })
        }
        req.user = decoded;
        next();
    });
};

export default verifyToken;