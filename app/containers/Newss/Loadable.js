/**
 *
 * Asynchronously loads the component for Newss
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
