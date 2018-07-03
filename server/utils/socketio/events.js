module.exports = (socket) => {

  socket.on('join-room', rId => {
    socket.join(`room:${rId}`);
    console.log("here: ", socket.userInfo)
  });

  socket.on('leave-room', rId => {
    socket.leave(`room:${rId}`)
  });
  
}
