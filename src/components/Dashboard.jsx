import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loadReports } from '../reports';
import Title from './Title.jsx';
import MainDashboard from './MainDashboard.jsx';
import FocussedDashboard from './FocussedDashboard.jsx';
import Validator from './Validator.jsx';

function Menu(props) {
  return <nav className='menu'>
    <ul>
      <li><NavLink exact={ true } to="/">Dashboard</NavLink></li>
      <li><NavLink to="/validator">Report Syndication</NavLink></li>
    </ul>
  </nav>;
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: false };
  }

  async loadReports() {
    this.setState({ data: [], loading: true });
    await loadReports({
      source: this.props.source,
      action: (data) => this.addReports(data),
    });
    this.setState({ loading: false });
  }

  addReports(reports) {
    const { data: currentData } = this.state;
    const data = currentData.concat(reports);
    this.setState({ data });
  }

  componentDidMount() {
    this.loadReports();
    setInterval(() => this.loadReports(), 300000);
  }

  render() {
    const { data } = this.state;
    const { title } = this.props;

    return (<>
      <Router>
        <header>
          <Title level={1}>{ title }</Title>
          <Menu />
        </header>
        <main>
          <Switch>
            <Route exact path="/"
              render={props => <MainDashboard {...props} data={ data } /> } />
            <Route path="/capital/:focus"
              render={props => <FocussedDashboard {...props} data={ data } /> } />
            <Route path="/validator"
              render={props => <Validator {...props} /> } />
          </Switch>
        </main>
      </Router>
    </>);
  }
}

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};
