import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import closeIcon from './close.svg';

import Title from './Title.jsx';
import { byCapital } from '../utils';

function ReportReference(props) {
  const { title = (<em>(Unknown report title)</em>), link } = props;
  return <div>{ title } <a href={ link }>Link</a></div>;
}
ReportReference.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function CloseButton(props) {
  const { link } = props;

  return <Link
    to={ link }
    id='dismiss'
    className='dismiss'
    alt='Dismiss'
    dangerouslySetInnerHTML={{ __html: closeIcon }}
  ></Link>;
}
CloseButton.propTypes = { link: PropTypes.string };

export default function FocussedDashboard(props) {
  const { match: { params: { focus } }, data } = props;
  const focussedData = data.filter(byCapital(focus));

  const reports = focussedData.map((_, idx) => (
    <ReportReference key={ idx }
      title={ _.description }
      link={ _.url }
    />
  ));

  const link = '/';

  return (
    <div className={ 'focussed ' + focus }>
      <Title>{ focus } Capital Reports</Title>
      { reports }
      <CloseButton link={ link }/>
    </div>
  );
}
FocussedDashboard.propTypes = {
  match: PropTypes.object,
  data: PropTypes.array,
};
