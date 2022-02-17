let Emiter=require('events');
const Even=require('is-even')

let event=new Emiter();

event.addListener("messageLogged",(args)=>{
    console.log(args)

})
event.emit("messageLogged",{id:13 , url :"http://biaaa.com"});





