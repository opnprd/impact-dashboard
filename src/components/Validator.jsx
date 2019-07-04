
import React from 'react';
import PropTypes from 'prop-types';

import syndicationBlurb from './text/syndicationFormat.md';

function ShowHide({ id, label }) {
  return <>
    <input type='checkbox' id={ id } name={ id } />
    <label htmlFor={ id } >{ label }</label>
  </>;
}
ShowHide.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default function Validator() {
  return <>
    <ShowHide id='show-doc' label='Show documentation'/>
    <section id='documentation'>
      <h1>Documentation</h1>
      <section
        dangerouslySetInnerHTML={{ __html: syndicationBlurb }}
      />
    </section>
  </>;
}
