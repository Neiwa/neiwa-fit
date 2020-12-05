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
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectWeightForm, {
  makeSelectStart,
  makeSelectEnd,
  makeSelectLoading,
  makeSelectWeightData,
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
  weightData,
  onSubmitForm,
  onChangeStart,
  onChangeEnd,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const weekdayFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
  });

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
      <ResponsiveContainer width="90%" height={400}>
        <LineChart data={weightData}>
          <Line type="monotone" dataKey="value" />
          <CartesianGrid />
          <XAxis
            dataKey="timestamp"
            scale="time"
            type="number"
            domain={['auto', 'auto']}
            angle={30}
            height={50}
            dy={15}
            interval="preserveEnd"
            padding={{ left: 30, right: 30 }}
            tickFormatter={timestamp =>
              new Date(timestamp).toLocaleDateString()
            }
          />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip
            formatter={value => [`${value.toFixed(1)} kg`, 'weight']}
            labelFormatter={label => {
              const date = new Date(label);
              return `${date.toLocaleDateString()} ${weekdayFormatter.format(
                date,
              )}`;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      {/* <ul>
        {weightData.map(e => (
          <li key={e.timestamp}>
            {new Date(e.timestamp).toLocaleString()} {e.value.toFixed(1)}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

WeightForm.propTypes = {
  loading: PropTypes.bool,
  start: PropTypes.number,
  end: PropTypes.number,
  weightData: PropTypes.array,
  onSubmitForm: PropTypes.func,
  onChangeStart: PropTypes.func,
  onChangeEnd: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  weightForm: makeSelectWeightForm(),
  loading: makeSelectLoading(),
  start: makeSelectStart(),
  end: makeSelectEnd(),
  weightData: makeSelectWeightData(),
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
