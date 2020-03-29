/**
 *
 * WeightForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { format } from 'date-fns';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectWeightForm, {
  makeSelectStart,
  makeSelectEnd,
  makeSelectLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadWeightData, changeStart, changeEnd } from './actions';

const key = 'weightForm';

export function WeightForm({
  loading,
  start,
  end,
  onSubmitForm,
  onChangeStart,
  onChangeEnd,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <input
          id="start"
          type="date"
          value={format(start, 'yyyy-MM-dd')}
          onChange={onChangeStart}
        />
        <input
          id="end"
          type="date"
          value={format(end, 'yyyy-MM-dd')}
          onChange={onChangeEnd}
        />
        <button type="submit">Get</button>
      </form>
      {loading ? (
        <FormattedMessage {...messages.loading} />
      ) : (
        <FormattedMessage {...messages.header} />
      )}
    </div>
  );
}

WeightForm.propTypes = {
  loading: PropTypes.bool,
  start: PropTypes.number,
  end: PropTypes.number,
  onSubmitForm: PropTypes.func,
  onChangeStart: PropTypes.func,
  onChangeEnd: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  weightForm: makeSelectWeightForm(),
  loading: makeSelectLoading(),
  start: makeSelectStart(),
  end: makeSelectEnd(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadWeightData());
    },
    onChangeStart: evt =>
      dispatch(changeStart(new Date(evt.target.value).valueOf())),
    onChangeEnd: evt =>
      dispatch(changeEnd(new Date(evt.target.value).valueOf())),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WeightForm);
