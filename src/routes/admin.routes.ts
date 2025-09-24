import { Router } from "express"
import { Task } from "../models/taskModel"
const router = Router()

// get all tasks
router.get("/getAll", async (req,res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(200).json(error)
    }
})




export default router;