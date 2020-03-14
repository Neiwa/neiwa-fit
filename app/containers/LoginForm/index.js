/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import makeSelectLoginForm, { makeIsLoginInProgress } from './selectors';
import { makeIsLoggedIn } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loginUser, logoutUser } from '../App/actions';
import { setLoginInProgress } from './actions';

import credentials from '../../utils/credentials';

const key = 'loginForm';

export function LoginForm({
  isLoggedIn,
  isLoginInProgress,
  onLoginRequest,
  onResponseGoogle,
  onLogoutUser,
  intl,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  if (isLoginInProgress) {
    return <FormattedMessage {...messages.loggingIn} />;
  }

  if (isLoggedIn) {
    return (
      <GoogleLogout
        clientId={credentials.web.client_id}
        buttonText={intl.formatMessage(messages.logout)}
        onLogoutSuccess={onLogoutUser}
      />
    );
  }

  return (
    <GoogleLogin
      clientId={credentials.web.client_id}
      buttonText={intl.formatMessage(messages.login)}
      onRequest={onLoginRequest}
      onSuccess={onResponseGoogle}
      onFailure={onResponseGoogle}
      cookiePolicy="single_host_origin"
      isSignedIn
      scope="https://www.googleapis.com/auth/fitness.activity.read"
    />
  );
}

LoginForm.propTypes = {
  isLoggedIn: PropTypes.bool,
  isLoginInProgress: PropTypes.bool,
  onLoginRequest: PropTypes.func,
  onResponseGoogle: PropTypes.func,
  onLogoutUser: PropTypes.func,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loginForm: makeSelectLoginForm(),
  isLoggedIn: makeIsLoggedIn(),
  isLoginInProgress: makeIsLoginInProgress(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoginRequest: () => dispatch(setLoginInProgress(true)),
    onResponseGoogle: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loginUser(evt));
      dispatch(setLoginInProgress(false));
    },
    onLogoutUser: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(logoutUser(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(LoginForm);
