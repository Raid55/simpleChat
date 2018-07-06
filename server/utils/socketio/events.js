module.exports = (socket) => {

  // Joining and leaving a room //
  socket.on('join-room', rId => {
    socket.join(`room:${rId}`);
    console.log("here: ", socket.userInfo)
  });
  socket.on('leave-room', rId => {
    socket.leave(`room:${rId}`)
  });
  

  // starting to type and stoping
  // socket.on('typing', whTping =>{

  // })
  
}
