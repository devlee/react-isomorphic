import socket from '../index';

export const sendData = () => {
  socket.emit('data', {
    data: 'data1'
  });
};

export const sendData2 = () => {
  socket.emit('data', {
    data: 'data2'
  });
};
