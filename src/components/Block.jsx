import React from 'react';
import Title from './Title.jsx';

function Count(props) {
  const { count } = props;
  return (<div className='count'>{ count }</div>);
}

export default function Block(props) {
  const { title, data, gridPos = 'grid-1-1' } = props;
  const classes = `block ${gridPos} ${title}`;
  return (<div className={ classes }>
    <Title>{ title }</Title>
    <Count count={ data.length } />
  </div>);
}