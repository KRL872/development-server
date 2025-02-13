import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

const port = process.env.PORT
const app: Express = express();


app.use(express.json())

app.use(cors({
    origin: "http://bigrobot.ca:2000",
    credentials: true
}));


app.get("/auth/status", (req: Request, res: Response) => {
    console.log("Api Request")
    res.status(200).json({ message: "Hello From Api" })
})

app.listen(port, () => {
    console.log(`Api Server Running on Port: ${port}`)
})


