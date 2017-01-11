import { env } from './env';

let defDomain = 'localhost';

defDomain = (env === 'production' ? 'devlee.io' : defDomain);

const domain = defDomain;

export default domain;
