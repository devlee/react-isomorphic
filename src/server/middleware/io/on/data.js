import socket from '../../../socket';

const receiveData = () => {
  socket.on('data', ({ data }) => {
    socket.emit('data', data);
  });
};

export default receiveData;
