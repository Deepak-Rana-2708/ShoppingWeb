import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const verifyToken = (req, res, next) => {
     const authHeader = req.headers.authorization;   

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            success: false,
            message: "Access Denied : No Token Provided"
        });
    }
    
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
