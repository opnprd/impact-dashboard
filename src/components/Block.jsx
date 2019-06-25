import React from 'react';
import Title from './Title.jsx';

function Count(props) {
  const { count } = props;
  return (<div>{ count }</div>);
}

export default function Block(props) {
  const { title, data } = props;
  return (<div>
    <Title>{ title }</Title>
    <Count count={ data.length } />
  </div>);
}