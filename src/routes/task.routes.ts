import { Router } from "express";
import { Task } from "../models/taskModel";
import { ITask } from "../models/task.types";

const router = Router()

// get one task
router.get("/:id", async (req,res) => {
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

// get all tasks
router.get("/getAll", async (req,res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(200).json(error)
    }
})

// create a task
router.post("/create", async (req,res) => {
    try {
        const newTask:ITask = req.body
        
        const task = await Task.create(newTask)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json(error)
    }   
})


// update a task
router.put("/:id", async (req,res) => {
    try {
        const { id } = req.params
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true })
        if(!updatedTask){
            return res.status(404).json({ message: "Task not found" })
        }
        res.status(200).json(updatedTask)
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

export default router