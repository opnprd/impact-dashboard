import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Summary from './Summary.jsx';
import { byCapital, createKeydownHandler, goTo } from '../utils';

const capitals = [ 'social', 'human', 'natural', 'intellectual', 'financial', 'manufacturing' ];

const calcGrid = (pos, cols) => `grid-${Math.floor(pos / cols) + 1}-${(pos % cols) + 1}`;

const summaryTemplate = () => ({ count: { value: 0, label: 'reports' } });

function summarise(acc, curr) {
  acc.count.value += 1;
  return acc;
}

const shortcutHandler = createKeydownHandler({
  actions: {
    's': () => goTo('/capital/social'),
    'h': () => goTo('/capital/human'),
    'n': () => goTo('/capital/natural'),
    'i': () => goTo('/capital/intellectual'),
    'f': () => goTo('/capital/financial'),
    'm': () => goTo('/capital/manufacturing'),
    'v': () => goTo('/validator'),
  },
});

export default class MainDashboard extends Component {
  render() {
    const { data = [] } = this.props;

    const reportBlocks = capitals.map((capital, idx) => {
      const gridPos = calcGrid(idx, 3);
      const clickTarget = `/capital/${capital}`;
      return <Summary title={ capital }
        key={ idx }
        data={ data.filter(byCapital(capital)).reduce(summarise, summaryTemplate()) }
        gridPos={ gridPos }
        link={ clickTarget }
      />;
    });
    return <div className='grid-wrap'>{ reportBlocks }</div>;
  }

  componentDidMount() {
    window.addEventListener('keydown', shortcutHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', shortcutHandler);
  }
}
MainDashboard.propTypes = { data: PropTypes.array };
