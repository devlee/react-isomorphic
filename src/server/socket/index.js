import log from '../../universal/socket-log';

const socket = {};

socket.register = io => {
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
  });
};

export default socket;
