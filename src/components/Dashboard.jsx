import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { loadReports } from '../reports';
import Title from './Title.jsx';
import Summary from './Summary.jsx';
import FocussedDashboard from './FocussedDashboard.jsx';

const capitals = [ 'social', 'human', 'natural', 'intellectual', 'financial', 'manufacturing' ];

const calcGrid = (pos, cols) => `grid-${Math.floor(pos / cols) + 1}-${(pos % cols) + 1}`;

function byCapital(capital) {
  return _ => _.capital === capital;
}

const summaryTemplate = () => ({ count: { value: 0, label: 'reports' } });

function summarise(acc, curr) {
  acc.count.value += 1;
  return acc;
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], capitalFocus: undefined };
    this.loadReports();
  }

  async loadReports() {
    const data = await loadReports({ source: this.props.source });
    this.setState({ data });
  }

  selectCapital(capital) {
    this.setState({ capitalFocus: capital });
  }

  baseDashboard() {
    const { data } = this.state;

    const reportBlocks = capitals.map((capital, idx) => {
      const gridPos = calcGrid(idx, 3);
      return <Summary title={ capital }
        key={ idx }
        data={ data.filter(byCapital(capital)).reduce(summarise, summaryTemplate()) }
        gridPos={ gridPos }
        clickHandler={ (e) => this.selectCapital(capital) }
      />;
    });
    return <div className='grid-wrap'>{ reportBlocks }</div>;
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      const actions = {
        'Escape': () => this.selectCapital(),
      };
      const action = actions[e.key];
      if (action !== undefined) action();
    });
  }

  focussedDashboard() {
    const { capitalFocus, data } = this.state;
    const focussedData = data.filter(byCapital(capitalFocus));

    return <FocussedDashboard
      capital={ capitalFocus }
      data={ focussedData }
      clickHandler={(e) => this.selectCapital()}
    />;
  }

  render() {
    const { capitalFocus } = this.state;
    const { title } = this.props;

    let content;

    if (capitalFocus === undefined) {
      content = this.baseDashboard();
    } else {
      content = this.focussedDashboard();
    }

    return (<>
      <Title level={1}>{ title }</Title>
      { content }
    </>);
  }
}

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};
