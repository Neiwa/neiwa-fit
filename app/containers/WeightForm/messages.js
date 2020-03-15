/*
 * WeightForm Messages
 *
 * This contains all the text for the WeightForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.WeightForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the WeightForm container!',
  },
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'Loading...',
  },
});
