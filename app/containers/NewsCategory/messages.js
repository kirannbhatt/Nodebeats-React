/*
 * NewsCategory Messages
 *
 * This contains all the text for the NewsCategory container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NewsCategory';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NewsCategory container!',
  },
});
