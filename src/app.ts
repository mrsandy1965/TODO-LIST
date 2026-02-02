import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config()
interface App_Interface{
    startServer():void;
    connectDatabase():void;
    initializeRoutes():void;
}

export default class App implements App_Interface{
    PORT:number | string | undefined;
    app:express.Application ;
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;
        this.startServer();
        this.connectDatabase()
        this.initializeRoutes()
    }
    startServer(): void {
        this.app.get("/health",(req,res)=>res.json({status:"OK",msg:"Server is running successfully"}))
        this.app.listen(this.PORT,()=>console.log(`server is running on port ${this.PORT}`))
    }
    async connectDatabase():Promise<void>{
        try{
            await mongoose.connect(process.env.DATABASE_URL as string)
            console.log("Database Connected")
        }catch(err){
            console.log(err)
        }
    }
    initializeRoutes(): void {
        console.log("route initialzied")
        this.app.use(express.json())
    }

}
