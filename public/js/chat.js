//cliemt
const socket=io()//storing the vale

//elements
const $messageform=document.querySelector('#message-form')
const $messageforminput=$messageform.querySelector('input')
const $messageformbutton=$messageform.querySelector('button')

//templates
const messageTemplate=document.querySelector('#message-template').innerHTML

const $message =document.querySelector('#messages') 
const locationmessagetemplate=document.querySelector('#location-message-template').innerHTML

const sidebartemplate=document.querySelector('#sidebar-template').innerHTML

//options
const{username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})


//autoscroll
const autoscroll=()=>
{
    const $newMessage = $message.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight - newMessageMargin

    // Visible height
    const visibleHeight = $message.offsetHeight

    // Height of messages container
    const containerHeight = $message.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $message.scrollTop + visibleHeight

    if (containerHeight + newMessageHeight >= scrollOffset) {
        $message.scrollTop = $message.scrollHeight
    }

}

socket.on('message',(message)=>//we can make any type here like 'message in () as it will store the value

{
    console.log(message)
    const html=Mustache.render(messageTemplate,{
        username:message.username,

        message:message.text,
        createdat:moment(message.createdat).format('h:mm a')
    })//mustache will give the data dynamially
    $message.insertAdjacentHTML('beforeend',html)//displaying the message
})


//locationmessage in console
socket.on('locationmessage',(message)=>//locationmessage give to server
{
    console.log(message)//server to client
    const html=Mustache.render(locationmessagetemplate,{
        username:message.username,
        url:message.url,
        createdat:moment(message.createdat).format('h:mm a')

    })
    $message.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('roomdata',({room,users})=>
{
    // console.log(room,users)
    const html=Mustache.render(sidebartemplate,{
        room,users
    })
     document.querySelector('#sidebar').innerHTML=html
     autoscroll()
})



$messageform.addEventListener('submit',(e)=>
{
    e.preventDefault()

    $messageformbutton.setAttribute('disabled','disabled')//only once we can send the message after that button will be disabled 

    //disable
    // const message=document.querySelector('input').value//taking the typed vale
    //orv
    const message=e.target.elements.message.value//message is name of input

    socket.emit('sendmessage',message,(error)=>//(message) is from server
    {
        //enable
        // console.log('message was delivered',message)

        $messageformbutton.removeAttribute('disabled')//only once we can send the message after that button will be enabled 
        $messageforminput.value=''
        $messageforminput.focus()//removes previous text in input

if(error)
{
    return console.log(error)
}
console.log('message delivered')

        
    })//acknowledgement
})



// socket.on('countupdated',(count)=>//same key in server client process is 'countupdate' to communicate and 'count' ,entioned also same
// {
//     console.log('the count is updated',count)//it will be available in more tools-developer tools-console
// })

// //writing code for button to listen the event 

// document.querySelector('#increment').addEventListener('click',()=>//increment is id of button
// {
//     console.log('clicked')
//     socket.emit('incremented')//client is there we have to create server to respond
// })



const $messagelocator=document.querySelector('#send-location')

//send location
$messagelocator.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    $messagelocator.setAttribute('disabled','disabled')//only once we can send the message after that button will be disabled 

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },(message)=>
        {
            $messagelocator.removeAttribute('disabled')//only once we can send the message after that button will be enabled 

            console.log("location shared")
        })
    })
})

socket.emit('join',{username,room},(error)=>{
    //if someone cant join in the room
    if(error){
        alert(error)
        location.href='/'//go to join room
    }
})