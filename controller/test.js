const { db } = require("../config")

const books = [
{
    id : 001,
    name : "pravani"
},
{
    id : 002,
    name : "pavan"
},
{
    id : 003,
    name : "pavanis"
},
{
    id : 004,
    name : "pav"
},
]

// function names() {
//     console.log("hi")
//     var t = books.find(function(e){
//         return e.id == 003;
//     });
//     console.log(t)
// }names()

// function test(){
// let names ={
//     id:001,
//     name:"pavani",
//     profession:"it"
// }
// let a = [1,2,3,4]
// let b = [5,6,7]
// let c = [8,9,10]
// let res1 = [...a]
// let res2 = [a,b,...c]
// let res3 = names.name
// console.log(res1)
// console.log(res2)
// console.log(res3)
// } test()

// function test1(){
//     var x =10
//     function b(){
//       console.log(x)
//     }b()
// }test1()

// const express = require('express')
// const app = express();
// app.get('/',function hello(req,res){
// //res.writeHead({contenttype :text/html})
// console.log("hello world")
// res.send("hello world")
// }).listen(8000)
// var e = 10;
// var a = 5;
// //console.log("ho")
// function sum(a) {
//     return function (b) {
//         return function (c) {
//             // outer scope
//             return function (d) {
//                 //local scope
//                 let result = a + b + c + d + e;
//                 console.log("hi")
//             }
//         }
//     }
// }sum() 

// class Bike {
//     constructor(color, model) {
//         this.color = color;
//         this.model = model;
//     }

//     getDetails() {
//         return this.model + ' bike has' + this.color + ' color';
//     }
// } Bike.getDetails()

function testing(req,res){
     setTimeout(test = () => {
         console.log("hello")
     },1000)
}testing()
await db.getdata()
await db.getdata2()
var x = {a:1,b:2}
var y = x
x.c = 10
select * from employees sortby salary = Math.max(salary)