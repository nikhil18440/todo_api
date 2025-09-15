import express, { Router } from 'express';
import { pool } from "../config/sqldb";

const router = Router()


router.get("/", async (req,res) => {
    try {
        const users = await pool.query("SELECT * FROM users WHERE age > ?",[18])
        res.status(200).json(users[0])
    } catch (error) {
        res.status(401).json(error)
    }
})

export default router;