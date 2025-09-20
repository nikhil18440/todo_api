import jwt from "jsonwebtoken";

export const generateAccessToken = (id:string): string => {
    const secret:string = process.env.ACCESS_TOKEN_SECRET as string
    const accessToken = jwt.sign(id, secret ,{expiresIn: '100s'})
    return accessToken
}


// export function authenticate(user) {
    
// }