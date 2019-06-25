import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { loadReports } from '../reports';
import Title from './Title.jsx';
import Summary from './Summary.jsx';

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
    this.state = { data: [] };
    this.loadReports();
  }

  async loadReports() {
    // eslint-disable-next-line react/prop-types
    const data = await loadReports({ source: this.props.source });
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    const { title } = this.props;

    const capitals = [ 'social', 'human', 'natural', 'intellectual', 'financial', 'manufacturing' ];
    const reportBlocks = capitals.map((capital, idx) => {
      const gridPos = calcGrid(idx, 3);
      return <Summary title={ capital }
        key={ idx }
        data={ data.filter(byCapital(capital)).reduce(summarise, summaryTemplate()) }
        gridPos={ gridPos }
      />;
    });

    return (<>
      <Title level={1}>{ title }</Title>
      <div className='grid-wrap'>{ reportBlocks }</div>
    </>);
  }
}

Dashboard.propTypes = { title: PropTypes.string.isRequired };
