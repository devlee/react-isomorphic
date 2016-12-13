import IO from 'koa-socket';

import socket from '../../socket';

import onInit from './on';

const ioInstance = new IO();

const io = app => {
  ioInstance.attach(app);

  socket.init(ioInstance);

  onInit();
};

export default io;
