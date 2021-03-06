import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Title from './Title.jsx';

function Metric(props) {
  const { value, label } = props;
  return (<>
    <div className='metric'>{ value }</div>
    <Label>{ label }</Label>
  </>);
}

Metric.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.node,
};

function Label(props) {
  const { children } = props;
  if (!children) return <></>;
  return <div className='label'>{ children }</div>;
}
Label.propTypes = { children: PropTypes.node };

export default function Summary(props) {
  const { title, data, gridPos = 'grid-1-1', metric = 'count', link } = props;
  const classes = `block ${gridPos} ${title}`;
  const { value, label } = data[metric];

  return (<div className={ classes }>
    <Link to={ link }>
      <Title>{ title }</Title>
      <Metric value={ value } label={ label }/>
    </Link>
  </div>);
}

Summary.propTypes = {
  title: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
  gridPos: PropTypes.string,
  metric: PropTypes.string,
  link: PropTypes.string,
};
