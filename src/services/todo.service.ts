import { TodoModel , TodoInterface } from "../schema/todo.schema";
export class TodoService{
    async getTask(){
        try{
            return await TodoModel.find();
        }catch(err){
            console.log(err)
        }

    }
    createTask(){}
    updateTask(){}
    deleteTask(){}
}