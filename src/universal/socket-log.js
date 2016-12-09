import { isClient } from './env';

const env = isClient ? 'client' : 'server';

const prefix = `[socket.io-${env}] `;

const log = (ctx) => {
  if (ctx) {
    console.log('>>>');
    console.log(`${prefix}EventType: ${ctx.type}`);
    console.log(`${prefix}EventName: ${ctx.event}`);
    console.log(`${prefix}Data Begin:`);
    console.log(' ');
    console.log(ctx.data);
    console.log(' ');
    console.log(`${prefix}Data End.`);
    console.log('<<<');
  }
};

export default log;
