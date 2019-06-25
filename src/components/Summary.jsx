import React from 'react';
import Title from './Title.jsx';

function Metric(props) {
  const { value, label } = props;
  return (<>
    <div className='metric'>{ value }</div>
    <Label>{ label }</Label>
  </>);
}

function Label(props) {
  const { children } = props;
  if (!children) return <></>;
  return <div className='label'>{ children }</div>;
}

export default function Block(props) {
  const { title, data, gridPos = 'grid-1-1', metric = 'count' } = props;
  const classes = `block ${gridPos} ${title}`;
  const { value, label } = data[metric];
  console.log(data[metric]);

  return (<div className={ classes }>
    <Title>{ title }</Title>
    <Metric value={ value } label={ label }/>
  </div>);
}