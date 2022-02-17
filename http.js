const Http=require('http');

const server=Http.createServer((req , res)=>{
    if(req==='/'){
        console.log("coneccted home");
        res.write("wellcome to my api");
        res.end()

    }else if(req==='/a'){
        res.write("wellcome to a");
        res.end()

    }

})
server.listen('3000')
console.log('listen on http://localhost:3000' )