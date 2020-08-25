const users=[]//array

//adduser,removeuser,getuser,getuserinroom

const adduser=({id,username,room})=>
{
//clean the data
username=username.trim().toLowerCase()
room=room.trim().toLowerCase()

//validate the data
if(!username|| !room)
{
return {
    error:'Username and room are required'
}
}
//check for existing user
const existinguser=users.find((user)=>{

    return user.room == room && user.username == username 
})

//validate username
if(existinguser){
    return  {error:"username is already used!!"}
    
}

//store user

const user={id,username,room}
users.push(user)
return {user}


}

const removeuser=(id)=>
{
    const index=users.findIndex((user)=> user.id == id)

        if(index!=-1){
            return users.splice(index,1)[0]//remove elements
        }

}


const getuser=(id)=>{
    return users.find((user)=>user.id == id)
}

const getusersinroom=(room)=>
{
    room=room.trim().toLowerCase()
    return users.filter((user)=>user.room==room)
}


module.exports={
    adduser,removeuser,
    getuser,
    getusersinroom
}



//checkiing the coding testing

// adduser({
//     id:22,
//     username:'SAI',
//     room:'south city'
// })
// adduser({
//     id:23,
//     username:'SAI',
//     room:'philly'
// })
// adduser({
//     id:24,
//     username:'SAI jagannadh',
//     room:'   south city '
// })
// // console.log(users)

// // const res=adduser({
// //     id:33,
// //     username:'SaIo',
// //     room:'ss'
// // })
// // // console.log(res)


// // const removeduser=removeuser(22)
// // console.log(removeduser)
// // console.log(users)

// const user=getuser(231)
// // console.log(user)

// const userlist=getusersinroom('philly')
// console.log(userlist)