import React from 'react';
import Title from './Title.jsx';

function Count(props) {
  const { count } = props;
  return (<div className='count'>{ count }</div>);
}

function Label(props) {
  const { children } = props;
  if (!children) return <></>;
  return <div className='label'>{ children }</div>;
}

export default function Block(props) {
  const { title, data, label, gridPos = 'grid-1-1' } = props;
  const classes = `block ${gridPos} ${title}`;
  return (<div className={ classes }>
    <Title>{ title }</Title>
    <Count count={ data.length } />
    <Label>{ label }</Label>
  </div>);
}