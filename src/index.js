//server side Code


//requirements to create the goal of chat app

//goal to create 
// 1.initialize  npm and install express//like "npm init" for init install //for express "npm i express"
// 2.setup a new express server
     //2.a server up the public directory
     //2.b listen on port 3000
//3.create index.html and render "chat App" to screen
//4.test your work|view the page in the browser and start the server

//This chat application is very usefulS



//loading express
const express=require('express')
const http=require('http')//to get the page
const socketio=require('socket.io')    //socket loading

//loading path
const path=require('path')
const { count } = require('console')
const app=express()
const server=http.createServer(app)//creating to exchange the chat server 
const io=socketio(server)

//npm i bad-words
const filter=require('bad-words')//for checking the required bad words acknow;edgement
const {generatemessage,generatelocationmessage}=require('./utils/messages')
const {adduser,removeuser,getuser,getusersinroom}=require('./utils/users')

const port =process.env.PORT||3000//port setting
//using the public folder file in below line
const publicdirectorypath=path.join(__dirname,'../public')//dirname is referred as 'this folder' and ../public referees as another folder


app.use(express.static(publicdirectorypath))//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

//emit--release

//server (emit--release)->client(receive)-countupdaed
//cient(emit)->server(receive)-increment






//socket server to client total code process writing
io.on('connection',(socket)=>//new connection and sosket for communication
{
     // let count=0//for global one

console.log('new websocket connection')

//user joining
socket.on('join',({username,room},callback)=>
{
     const {error,user}=adduser({id:socket.id,username,room})

     if(error)
     {
        return   callback(error)
     }



socket.join(user.room)
socket.emit('message',generatemessage('Admin','Welcome!!'))
socket.broadcast.to(user.room).emit('message',generatemessage('Admin',`${user.username} has joined`))//if new user opens another webbrowser then we get this message to the main browser
//side page code

io.to(user.room).emit('roomdata',{
room:user.room,
users:getusersinroom(user.room)
})

callback()

})

socket.on('sendmessage',(messaged,callback)=>//same as the client,callback for acknowledgment
{
const user=getuser(socket.id)
//bad words 
const Filter =new filter()
if(Filter.isProfane(messaged))
{
     return callback('profanity is not allowed')
}



io.to(user.room).emit('message',generatemessage(user.username,messaged))//'message' key is must be client emit key 
// callback("Delivered!!!")
callback()//server message will be delivered
})

// socket.emit('countupdated',count)//sending event in server to send to client

// socket.on('incremented',()=>//same as client socket.emit in event listener object
// {
//      count++
//      // socket.emit('countupdated',count)//we updating the count
//      io.emit('countupdated',count)//this io will emits all connections same value like count --open two webbrowsers and see the difference
// })

socket.on('sendLocation', (coords,callback) => {
     const user=getuser(socket.id)
     io.to(user.room).emit('locationmessage', generatelocationmessage(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))//location 
     callback()
 })

socket.on('disconnect',()=>//if another user disconnects
{
   const user=  removeuser(socket.id)
   if(user)
   {
     io.to(user.room).emit('message',generatemessage('Admin',`${user.username} has left `))
     io.to(user.room).emit('roomdata',{
          room:user.room,
          users:getusersinroom(user.room)
          })
   }
// callback()
})



})








server.listen(port,()=>
{
     console.log(`server is up on port on ${port}......`)//port processing the localhost


})

//goal:setup scripts in "package.json"

// 1.create a "start" script to start the app using node
// 2.install nodemon and a development dependency
// 3.create a "dev" script to start the app using nodemon
//4.run both scripts to test your work
//5.we developed all work in "package.json" and we will run the code 
// from root folder i.e chat-app and we will run both "npm run start " or "npm run dev" in package.json we direced the path of the code

//installing the socket.io//npm i socket.io

//craeet the js in public for chat.js in future


//we are adding new button i  index.html to share the location