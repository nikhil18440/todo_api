import { Express ,Router} from "express";
import { User } from "../models/userModel";

const router = Router()


// register
router.post("/register", async (req,res) => {
    try {
        const userBody = req.body

        const user = await User.create(userBody)
        res.status(201).json(user)    //user created

    } catch (error) {
        res.status(500).json(error)
    }
})


// login
router.post("/login", async (req,res) => {
    try {
        
        const userEmail = req.body.email

        const user = await User.findOne({"email": userEmail})

        if (user) {

            const password = req.body.password
            if (password === user.password) {
                
            }else{
                res.status(401).json("forbidden")
            }
            

        }else{
            res.status(400).json("user not found")
        }
        

    } catch (error) {
        res.status(400).json(error)
    }
})



export default router;