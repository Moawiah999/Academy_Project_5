const auth = (socket, next) => {
  const headers = socket.handshake.headers;
  console.log("from auth");
  if (!headers.token) {
    next(new Error("invalid"));
  } else {
    socket.user = { token: headers.token, user_id: headers.user_id };
    next();
  }
};
module.exports = auth;
