class Person{
    constructor(name , ssn , age){
        this.name=name ,
        this.ssn=ssn ,
        this.age=age
    }
}




function printName(){
    console.log(this.name)

}
let newPrintName=printName.bind(new Person("reza","55849799999",25));
newPrintName();