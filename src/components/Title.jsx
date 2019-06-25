import React from 'react';
import PropTypes from 'prop-types';

export default function Title(props) {
  const { level = 2, children } = props;
  const HeadingTag = `h${level}`;

  return (<HeadingTag>{ children }</HeadingTag>);
}
Title.propTypes = {
  level: (props, propName, componentName) => {
    const prop = props[propName];
    if (prop === undefined) return;
    if (!Number.isInteger(prop) || prop < 1 || prop > 6) {
      return new Error(`Invalid prop ${propName} = ${prop} supplied to ${componentName}.`);
    }
  },
};
