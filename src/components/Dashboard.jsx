import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loadReports } from '../reports';
import Title from './Title.jsx';
import MainDashboard from './MainDashboard.jsx';
import FocussedDashboard from './FocussedDashboard.jsx';
import Validator from './Validator.jsx';
import Menu from './Menu.jsx';

import whiteRose from './images/white-rose.svg';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: false };
  }

  async loadReports() {
    this.setState(() => ({ data: [], loading: true }));
    await loadReports({
      source: this.props.source,
      action: (data) => this.addReports(data),
    });
    this.setState(() => ({ loading: false }));
  }

  addReports(reports) {
    this.setState((state) => {
      const { data: currentData } = state;
      const data = currentData.concat(reports);
      return { data };
    });
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
          <Title level={1}>
            { title }
            <img src={ whiteRose } id='rose' className='logo'/>
          </Title>
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
