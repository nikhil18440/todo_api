import { Request, Response, Router } from "express";
import { Task } from "../models/taskModel";
import { ITask } from "../models/task.types";
import { authenticateUser, checkUser } from "../config/authServer";
import { AuthRequest } from "../config/type";

const router = Router()



// get a single users task
router.get("/user/:userId",authenticateUser, async (req:AuthRequest,res:Response) => {
    try {

        if (checkUser(req)) {
            const tasks = await Task.aggregate([
                { $match: { userId: req.params.userId } }
            ])
            res.status(200).json(tasks)
        }else{
            res.status(401).json("forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// get completed
router.get("/completed/:userId", async (req,res) => {
    try {
        if(checkUser(req)){
            const tasks = await Task.aggregate([
                {
                    $match: {completed: false}
                }
            ])
            res.status(200).json(tasks)
        }else{
            res.status(401).json("forbidden")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})



// get one task
router.get("getTask/:id", async (req,res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        if(!task){
            return res.status(404).json({ message: "Task not found" })
        }   
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error)
    }  
})


// create a task
router.post("/create/:userId", authenticateUser, async (req,res) => {
    try {
        if (checkUser(req)) {
            const newTask:ITask = req.body
            const task = await Task.create(newTask)
            res.status(201).json(task)
        }else{
            res.status(401).json("forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }   
})


// update a task
router.put("/:userId",authenticateUser, async (req,res) => {
    try {
        if (checkUser(req)) {
            const id = req.query.id
            const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true })
            if(!updatedTask){
                return res.status(404).json({ message: "Task not found" })
            }
            res.status(200).json(updatedTask)
        }else{
            res.status(401).json("forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }   
})

// delete a task
router.delete("/:id", async (req,res) => {
    try {
        const { id } = req.params   
        const deletedTask = await Task.findByIdAndDelete(id)
        if(!deletedTask){
            return res.status(404).json({ message: "Task not found" })
        }   
        res.status(200).json({ message: "Task deleted successfully" })
    } catch (error) {
        res.status(500).json(error)
    }   
})


router.delete("/", async (req,res) => {
    try {
        await Task.deleteMany()
        res.status(200).json("deleted succesfully")
    } catch (error) {
        res.status(404).json(error)
    }
})



export default router