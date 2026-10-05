<div align="center">

# 💬 Real-Time Chat App — Node.js + Socket.IO

### Join a room, chat instantly, share your location — with a built-in profanity filter.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-realtime-010101?style=flat-square&logo=socketdotio&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## ✨ Features

- 🏠 **Rooms** — pick a username and room; messages are scoped with `io.to(room)`
- ⚡ **Real-time messaging** over WebSockets, with delivery acknowledgements
- 👥 **Live sidebar** — who's in the room updates as people join and leave
- 📍 **Share location** — one click sends a Google Maps link via the browser Geolocation API
- 🧼 **Profanity filter** — messages are checked with `bad-words` before broadcast
- 🔔 **System messages** — "Welcome!", "X has joined", "X has left"

## 🏗️ Event flow

```
client                       server (src/index.js)
  join {username, room} ───►  addUser → socket.join(room)
                        ◄───  message "Welcome!" · roomdata {users}
  sendmessage ─────────────►  profanity check → io.to(room).emit('message')
  sendLocation ────────────►  io.to(room).emit('locationmessage')
  disconnect ──────────────►  removeUser → roomdata update
```

## 🚀 Run it

```bash
git clone https://github.com/SaiSatyaJagannadh/Chat_Application.git && cd Chat_Application
npm install
npm run dev        # nodemon → http://localhost:3000
```

Open two browser windows, join the same room, and chat.

---

<div align="center">

**Built by [Sai Satya Jagannadh Doddipatla (DJ)](https://saisatyajagannadh.github.io/PersonalPortfolio/)** · ⭐ Star the repo if it helped

</div>
