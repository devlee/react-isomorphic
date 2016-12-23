import socket from '../../../socket';

import { isPwa } from '../../../../universal/env';

const receiveData = () => {
  socket.on('data', data => {
    socket.emit('data', isPwa ? data : data.data);
  });
};

export default receiveData;
