import io from 'socket.io-client';

import onInit from './on';

import log from '../../universal/socket-log';

let ioInstance = null;

const socket = {};

const emit = (event, data) => {
  log({
    event,
    data,
    type: 'emit'
  });
  ioInstance.emit(event, data);
};

const on = (event, cb) => {
  ioInstance.on(event, data => {
    log({
      event,
      data,
      type: 'on'
    });
    cb(data);
  });
};

socket.init = () => {
  ioInstance = io();

  socket.io = ioInstance;

  onInit();

  socket.init = () => {};
};

socket.emit = emit;

socket.on = on;

export default socket;
