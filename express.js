const express=require('express');

const app=express();

app.use(express.json());
app.get("/",(req , res)=>{
res.json({
    name:"ali",
    age:"22"
})
})
app.post("/",(req,res)=>{
    console.log(req.body);
    res.json({
        status:true
    })
})
app.listen('3000',()=>{
    console.log("conected to 3000")
})