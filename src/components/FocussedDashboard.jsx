import React from 'react';
import PropTypes from 'prop-types';

import Title from './Title.jsx';

function ReportReference(props) {
  const { title = (<em>(Unknown report title)</em>), link } = props;
  return <div>{ title } <a href={ link }>Link</a></div>;
}
ReportReference.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function X() {
  return 'X';
}

export default function FocussedDashboard(props) {
  const { clickHandler, data, capital } = props;

  const reports = data.map((_, idx) => (
    <ReportReference key={ idx }
      title={ _.description }
      link={ _.url }
    />
  ));

  // const className = `focussed ${ capital }`

  return (
    <div className={ 'focussed ' + capital }>
      <Title>{ capital } Capital Reports</Title>
      { reports }
      <a id='dismiss' onClick={ clickHandler } alt='Dismiss'><X/></a>
    </div>
  );
}
FocussedDashboard.propTypes = {
  clickHandler: PropTypes.func,
  data: PropTypes.object,
  capital: PropTypes.string,
};
