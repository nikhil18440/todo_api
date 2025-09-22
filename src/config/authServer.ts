import { NextFunction, Request,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// ---------- Interfaces ----------
interface JwtUserPayload extends JwtPayload {
  username: string;
}

interface AuthRequest extends Request {
  user?: JwtUserPayload;
}


export const generateAccessToken = (user:object): string => {

        const secret = process.env.ACCESS_TOKEN_SECRET as string
        const accessToken = jwt.sign(user, secret )
        return accessToken

}


export const authenticateUser = (req:AuthRequest,res:Response,next:NextFunction) => {
    const authHeader =  req.headers['authorization']
    const token = authHeader?.split(' ')[1]
    
    if(!token){
        res.status(401).json("no token")
        return
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtUserPayload
        req.user = user
        next()
    } catch (error) {
        res.status(500).json(error)
    }

}


export const checkUser = (userId:string, loggedUser:string):boolean => {
    if(userId === loggedUser){
        return true
    }else{
        return false
    }
}