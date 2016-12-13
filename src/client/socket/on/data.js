import socket from '../index';

const receiveData = () => {
  socket.on('data', () => {});
};

export default receiveData;
