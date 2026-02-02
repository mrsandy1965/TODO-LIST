import { Schema , Document , model } from "mongoose";
export interface TodoInterface extends Document{
    title:string;
    body:string;
}
const TodoSchema = new Schema<TodoInterface>()
export const TodoModel = model("Task",TodoSchema)