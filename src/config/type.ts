import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// ---------- Interfaces ----------
export interface JwtUserPayload extends JwtPayload {
  user? :{
    id: string;
    username: string;
  }
}

export interface AuthRequest extends Request {
  user?: JwtUserPayload;
}