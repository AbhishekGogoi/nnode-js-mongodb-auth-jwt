const express=require( 'express');
const cors=require("cors");

const corsOptions={
    origin:"http://localhost:8080"
}
const app=express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/",(req,res)=>{
    return res.send("Welcome to the API");
})
app.listen(8080,()=>{
    console.log('Server is running on port 8080');
})