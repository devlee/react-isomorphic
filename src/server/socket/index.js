import log from '../../universal/socket-log';

const socket = {};

let ioInstance = null;

const emit = (event, data) => {
  log({
    event,
    data,
    type: 'emit'
  });
  ioInstance.broadcast(event, data);
};

const on = (event, cb) => {
  ioInstance.on(event, cb);
};

socket.init = io => {
  if (ioInstance === null) {
    ioInstance = io;
  }

  io.use(async (ctx, next) => {
    log({
      event: ctx.event,
      data: ctx.data,
      type: 'on'
    });
    await next();
  });

  socket.init = () => {};
};

socket.emit = emit;

socket.on = on;

export default socket;
