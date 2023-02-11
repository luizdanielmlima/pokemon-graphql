import React from 'react';

import pikachu from '../../assets/pikachu.png';
import error from '../../assets/error.png';

import classes from './LoadingErrorFeedback.module.css';

interface FeedbackProps {
  mode: string;
}

const LoadingErrorFeedback = (props: FeedbackProps) => {
  const { mode } = props;
  const feedbackImg = mode === 'loading' ? pikachu : error;
  const feedbackColor = mode === 'loading' ? '#223a6b' : '#EE3131';
  const feedbackMsg =
    mode === 'loading'
      ? 'loading data...'
      : 'An error occured... Please reload the page';

  return (
    <div data-testid="loading-container" className={classes.feedback}>
      <div className={classes.feedback__cen}>
        <img src={feedbackImg} alt="pikachu" />
        <div className={classes.feedback__label}>
          <p
            style={{
              color: `${feedbackColor}`,
            }}
          >
            {feedbackMsg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingErrorFeedback;
