/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import LoginForm from '../LoginForm';
import WeightForm from '../WeightForm';
import { makeIsLoggedIn } from '../LoginForm/selectors';

export function HomePage({ loggedIn }) {
  return (
    <>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <LoginForm />
      {loggedIn ? <WeightForm /> : ''}
    </>
  );
}

HomePage.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeIsLoggedIn(),
});

function mapDispatchToProps(/* dispatch */) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
