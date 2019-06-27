import React from 'react';
import PropTypes from 'prop-types';

import closeIcon from './close.svg';

import Title from './Title.jsx';

function ReportReference(props) {
  const { title = (<em>(Unknown report title)</em>), link } = props;
  return <div>{ title } <a href={ link }>Link</a></div>;
}
ReportReference.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function CloseButton(props) {
  const { clickHandler } = props;

  return <a
    id='dismiss' onClick={ clickHandler }
    className='dismiss'
    alt='Dismiss'
    dangerouslySetInnerHTML={{ __html: closeIcon }}
  ></a>;
}
CloseButton.propTypes = { clickHandler: PropTypes.func };

export default function FocussedDashboard(props) {
  const { clickHandler, data, capital } = props;

  const reports = data.map((_, idx) => (
    <ReportReference key={ idx }
      title={ _.description }
      link={ _.url }
    />
  ));

  return (
    <div className={ 'focussed ' + capital }>
      <Title>{ capital } Capital Reports</Title>
      { reports }
      <CloseButton clickHandler={clickHandler}/>
    </div>
  );
}
FocussedDashboard.propTypes = {
  clickHandler: PropTypes.func,
  data: PropTypes.array,
  capital: PropTypes.string,
};
