import { TodoService } from "../services/todo.service";
import express,{Request,Response} from "express"
class TodoController{
    todoService = new TodoService() ;
    app = express()

    getAllTasks = async (req:Request,res:Response)=>{
        const task = await this.todoService.getTask()
        res.json(task)
    }
}