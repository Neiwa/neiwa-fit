/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the LoginForm container!',
  },
  loggingIn: {
    id: `${scope}.loggingIn`,
    defaultMessage: 'Logging in...',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
});
