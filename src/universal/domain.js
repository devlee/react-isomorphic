import { env } from './env';

let defDomain = 'localhost';

defDomain = (env === 'production' ? 'xxx' : defDomain);

const domain = defDomain;

export default domain;
