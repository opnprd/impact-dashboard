import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import closeIcon from './images/close.svg';

import Title from './Title.jsx';
import { byCapital, goTo, createKeydownHandler } from '../utils';

function ReportReference(props) {
  const { title = (<em>(Unknown report title)</em>), link } = props;
  return <div className='report'><a href={ link }>{ title }</a></div>;
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
  ><img src={ closeIcon } /></Link>;
}
CloseButton.propTypes = { link: PropTypes.string };

const shortcutHandler = createKeydownHandler({
  actions: {
    'escape': () => goTo('/'),
    'v': () => goTo('/validator'),
  },
});

export default class FocussedDashboard extends Component {
  render() {
    const { match: { params: { focus } }, data } = this.props;
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

  componentDidMount() {
    window.addEventListener('keydown', shortcutHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', shortcutHandler);
  }
}

FocussedDashboard.propTypes = {
  match: PropTypes.object,
  data: PropTypes.array,
};
