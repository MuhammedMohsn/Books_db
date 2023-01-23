const express=require("express")
const app=express()
const cors=require("cors")
const router=require("./Routes/api")
const port=4000
app.use(cors({origin:"*"}))
app.use("/",router)
app.listen(port,()=>{
    console.log(`server runs in port ${port}`)
})
