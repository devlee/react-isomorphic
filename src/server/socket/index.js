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

socket.register = io => {
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

  io.on('data', (ctx, data) => {
    console.log('SERVER: socket on `data` event ', data);
    emit('data', { devlee: 'sio' });
  });
};

export default socket;
