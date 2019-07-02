import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loadReports } from '../reports';
import Title from './Title.jsx';
import MainDashboard from './MainDashboard.jsx';
import FocussedDashboard from './FocussedDashboard.jsx';

function goTo(path) {
  window.location = `#${path}`;
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadReports();
  }

  async loadReports() {
    const data = await loadReports({ source: this.props.source });
    this.setState({ data });
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      const actions = {
        'Escape': () => goTo('/'),
        's': () => goTo('/capital/social'),
        'h': () => goTo('/capital/human'),
        'n': () => goTo('/capital/natural'),
        'i': () => goTo('/capital/intellectual'),
        'f': () => goTo('/capital/financial'),
        'm': () => goTo('/capital/manufacturing'),
      };
      const action = actions[e.key];
      if (action !== undefined) action();
    });
  }

  render() {
    const { data } = this.state;
    const { title } = this.props;

    return (<>
      <Title level={1}>{ title }</Title>
      <Router>
        <Route exact path="/"
          render={props => <MainDashboard {...props} data={ data } /> } />
        <Route path="/capital/:focus"
          render={props => <FocussedDashboard {...props} data={ data } /> } />
      </Router>
    </>);
  }
}

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};
