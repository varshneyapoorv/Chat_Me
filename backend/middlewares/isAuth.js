import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decode) {
            return res.status(401).json({ message: "Invalid Token" });
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
        
    }
}

export default isAuth;