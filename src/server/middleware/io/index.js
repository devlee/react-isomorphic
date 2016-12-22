import IO from 'koa-socket';

import IO2 from 'socket.io';

import socket from '../../socket';

import onInit from './on';

import { isPwa } from '../../../universal/env';

let ioInstance;

const io = app => {
  if (isPwa) {
    ioInstance = IO2.listen(app);
    ioInstance.sockets.on('connection', io2 => {
      io2.on('data', data => {
        io2.emit('data', data);
      });
    });
  } else {
    ioInstance = new IO();
    ioInstance.attach(app);
    socket.init(ioInstance);
    onInit();
  }
};

export default io;
