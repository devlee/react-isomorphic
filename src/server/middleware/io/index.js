import IO from 'koa-socket';

import socket from '../../socket';

const ioInstance = new IO();

const io = app => {
  ioInstance.attach(app);

  socket.register(ioInstance);
};

export default io;
