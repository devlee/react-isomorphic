import socket from '../index';

const receiveData = () => {
  socket.on('data', data => {
    console.log(data);
  });
};

export default receiveData;
