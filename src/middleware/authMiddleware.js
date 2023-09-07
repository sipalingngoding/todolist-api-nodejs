import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next)=>{
    const token = req.get('Authorization');
    if(!token){
        return res.status(401).json({
            message : "Unauthorized",
        })
    }
    try{
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    }catch (err)
    {
        return res.status(401).json({
            message : "Unauthorized",
        })
    }

}

export default authMiddleware;