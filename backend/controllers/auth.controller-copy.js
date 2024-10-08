const generateTokens = (userId)=> {
    const accessToken = jwt.sign({userId}),process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:  "15m",
    }
    const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET),{
    expiresIn: "7d",
}
return {accessToken,refreshToken}

}
const storeRefreshToken = async(userId,refreshToken) => {
    await redis.set(
        'refreshToken:${userId}',
        refreshToken,
        "EX",
        7*24*60*60
    )
},
//cookie
const setCookies = (res,accessToken,refreshToken)=>{
    res.cookie('accesstoken',"accessToken",{
        httpOnly: true,
        secure: process.env.NODE_env === "production",
        sameSite: "strict",
        maxAge: 15*60*1000;
    });
    res.cookie("refreshToken","refreshToken",{
        httpOnly: true,
        secure: process.env.NODE_env=== "production",
        sameSite: :"strict",
        maxAge: 9ru9
    });
    

}