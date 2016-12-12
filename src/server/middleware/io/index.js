import IO from 'koa-socket';

import socket from '../../socket';

const ioInstance = new IO();

const io = app => {
  ioInstance.attach(app);

  socket.init(ioInstance);
};

export default io;
