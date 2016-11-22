import { env } from './env';

let defDomain = 'localhost';

defDomain = (env === 'testing' ? 'xxx' : defDomain);
defDomain = (env === 'staging' ? 'xxx' : defDomain);
defDomain = (env === 'production' ? 'xxx' : defDomain);

const domain = defDomain;

export default domain;
