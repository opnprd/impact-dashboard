import React from 'react';

export default function Title(props) {
  const { level = 2, children } = props;
  const HeadingTag = `h${level}`;

  return (<HeadingTag>{ children }</HeadingTag>);
}
