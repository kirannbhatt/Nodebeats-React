/**
 *
 * Asynchronously loads the component for Blog
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
