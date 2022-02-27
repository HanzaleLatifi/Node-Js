const express=require('express');

const app=express();

let movies=[];
let currentId=1;
app.use(express.json());

//get all
app.get('/api/movies',(req,res)=>{
    res.json(movies)
    
})

//get once  
app.get('/api/movies/:id',(req,res)=>{
    
    for (const movie of movies) {
        if(movie.id===parseInt(req.params.id)){
            return res.json(movie)         
        }        
    }
    res.status(404).json({
        "status":false,
        "desc":"not found"
    })
    
})

//delete 
app.delete('/api/movies/:id',(req,res)=>{
    movies = movies.filter((data)=>{
        return data.id !== parseInt(req.params.id);
    });
    return res.send({
        status:true
    })
});


//post 
app.post('/api/movies',(req , res)=>{

    if (!req.body.name || !req.body.desc){
        return res.status(400).send({
            'status' : false,
            "desc":"validation filed!"
        })
    }
    let result={
        id:currentId++,
        name:req.body.name,
        desc:req.body.desc
    }
    movies.push(result);
    res.send(result)
})


//patch
app.patch('/api/movies/:id',(req,res)=>{
    if (!req.body.name || !req.body.desc){
        return res.status(400).send({
            'status' : false,
            "desc":"validation filed!"
        })
    }
    let result = false
    for (const movie of movies) {
        if (movie.id === parseInt(req.params.id)){
            result = movie
        }
    }
    if (!result){
        return res.status(404).json({
            status:false,
            desc:"not found!"
        })
    }

    result.name= req.body.name;
    result.desc= req.body.desc;

    return res.send(result);

});

app.listen('3000',()=>{
    console.log("conected to 3000")
})
