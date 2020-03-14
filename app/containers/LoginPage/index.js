/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import GoogleLogin from 'react-google-login';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import credentials from '../../utils/credentials';

export function LoginPage({ onResponseGoogle }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <GoogleLogin
        clientId={credentials.web.client_id}
        buttonText="Login"
        onSuccess={onResponseGoogle}
        onFailure={onResponseGoogle}
        cookiePolicy="single_host_origin"
        isSignedIn
      />
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onResponseGoogle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(/* dispatch */) {
  return {
    onResponseGoogle: evt => {
      console.log(evt);
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
