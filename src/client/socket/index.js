import io from 'socket.io-client';

import log from '../../universal/socket-log';

const socket = {};

let ioInstance = null;

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

  emit('data', {
    devlee: 'io'
  });

  on('data', data => {
    console.log(data);
  });
};

export default socket;
