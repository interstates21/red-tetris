export const emmit = (socket, room, type, data) =>
  socket.to(room).emit(type, { data });
