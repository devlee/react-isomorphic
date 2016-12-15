import offline from 'offline-plugin/runtime';

import { isPwa } from '../../universal/env';

const sw = {};

sw.init = () => {
  if (isPwa) {
    offline.install();
  }
};

export default sw;
