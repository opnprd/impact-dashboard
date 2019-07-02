import React from 'react';
import PropTypes from 'prop-types';

import Summary from './Summary.jsx';
import { byCapital } from '../utils';

const capitals = [ 'social', 'human', 'natural', 'intellectual', 'financial', 'manufacturing' ];

const calcGrid = (pos, cols) => `grid-${Math.floor(pos / cols) + 1}-${(pos % cols) + 1}`;

const summaryTemplate = () => ({ count: { value: 0, label: 'reports' } });

function summarise(acc, curr) {
  acc.count.value += 1;
  return acc;
}

export default function MainDashboard(props) {
  const { data = [] } = props;

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
MainDashboard.propTypes = { data: PropTypes.array };
