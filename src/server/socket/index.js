import log from '../../universal/socket-log';

import { isPwa } from '../../universal/env';

const socket = {};

let ioInstance = null;

const emit = (event, data) => {
  log({
    event,
    data,
    type: 'emit'
  });

  if (isPwa) {
    ioInstance.emit(event, data);
  } else {
    ioInstance.broadcast(event, data);
  }
};

const on = (event, cb) => {
  ioInstance.on(event, cb);
};

socket.init = io => {
  if (ioInstance === null || isPwa) {
    ioInstance = io;
  }

  socket.io = ioInstance;

  if (isPwa) {
    io.use(async (ctx, next) => {
      if (ctx && ctx.length > 1) {
        log({
          event: ctx[0],
          data: ctx[1],
          type: 'on'
        });
      }
      await next();
    });
  } else {
    io.use(async (ctx, next) => {
      log({
        event: ctx.event,
        data: ctx.data,
        type: 'on'
      });
      await next();
    });
    socket.init = () => {};
  }
};

socket.emit = emit;

socket.on = on;

export default socket;
