const express = require("express");

const app = express();

let movies = [];
let currentId = 1;
app.use(express.json());

let users = [
  { username: "ali", password: "0917", moviesId: [] },
  { username: "mmd", password: "0919", moviesId: [] },
];

//auth is Middleware

//get all
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

//get once
app.get("/api/movies/:id", (req, res) => {
  for (const movie of movies) {
    if (movie.id === parseInt(req.params.id)) {
      return res.json(movie);
    }
  }
  res.status(404).json({
    status: false,
    desc: "not found",
  });
});
function auth(isAuthorization) {
  return function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let flag = false;
    users.forEach((user) => {
       
      if (user.username === username && user.password === password) {

        if(isAuthorization){
            let movieID=req.params.id;
            user.moviesId.forEach((movieid)=>{
                if(parseInt(movieID)===movieid){
                    flag=true;
                    return next();
                }
            })
        }else{
            flag = true;
            return next();
        }
        
      }
    });
    if (!flag) {
      res.status(403).send("un auth");
    }
  };
}

//post
app.post("/api/movies", auth(false), (req, res) => {
    if (!req.body.name || !req.body.desc) {
      return res.status(400).send({
        status: false,
        desc: "validation filed!",
      });
    }
    let result = {
      id: currentId++,
      name: req.body.name,
      desc: req.body.desc,
    };
    movies.push(result);
    users.forEach((user) => {
      if (req.body.username === user.username) {
        user.moviesId.push(result.id);
        return;
      }
    });
    res.send(result);
  });

//delete
app.delete("/api/movies/:id", auth(true), (req, res) => {
  movies = movies.filter((data) => {
    return data.id !== parseInt(req.params.id);
  });
  return res.send({
    status: true,
  });
});



//patch
app.patch("/api/movies/:id", auth(true), (req, res) => {
  if (!req.body.name || !req.body.desc) {
    return res.status(400).send({
      status: false,
      desc: "validation filed!",
    });
  }
  let result = false;
  for (const movie of movies) {
    if (movie.id === parseInt(req.params.id)) {
      result = movie;
    }
  }
  if (!result) {
    return res.status(404).json({
      status: false,
      desc: "not found!",
    });
  }

  result.name = req.body.name;
  result.desc = req.body.desc;

  return res.send(result);
});

app.listen("3000", () => {
  console.log("conected to 3000");
});
