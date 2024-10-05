import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const protectRoute = async (req,res,next)={
    try {
        const accessToken= req.cookies.accessToken;
        if(!accessToken){
            return res.return(401).json.({message: "unautorized - no access token provided"});
        }
        try {
            const decoded= jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(401).json({message: "User not found"});
        }
        req.user = user;
        next();
        } catch (error) {
            if(error.name==="TokenExpiredError") {
                return res.status(401).json({message: "unauthorised - Invalid access token"});
            }
        }
    } catch (error) {
        console.log("error in protectRoute middleware");
        return res.status(401).json({message:"unauthorized-Invalid access token"});
    }
}
export const adminRoute=(req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        next();
        return res.status(401).json(({message: "Access denied- admin only "}));
    }
}
