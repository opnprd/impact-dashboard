import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Title from './Title.jsx';

import syndicationBlurb from './text/syndicationFormat.md';

import { validateSyndicationFormat } from '../reports/validate.js';

import { goTo, createKeydownHandler } from '../utils';

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

function Documentation() {
  return <>
    <ShowHide id='show-doc' label='Show documentation'/>
    <section id='documentation'>
      <Title>Documentation</Title>
      <section
        dangerouslySetInnerHTML={{ __html: syndicationBlurb }}
      />
    </section>
  </>;
}

function ValidationError({ error }) {
  return <>
    <li level={ 3 }>{ error.dataPath } { error.message }</li>
  </>;
}
ValidationError.propTypes = {
  error: PropTypes.object.isRequired,
};

const shortcutHandler = createKeydownHandler({
  actions: {
    'escape': () => goTo('/'),
  },
});

function validate(value) {
  let valid;
  let errors;
  try {
    const schema = JSON.parse(value);
    ({ valid, errors = [] } = validateSyndicationFormat(schema));
  } catch (error) {
    valid = false;
    errors = [ { message: 'invalid JSON document', path: '' } ];
  }

  return { valid, errors };
}

export default class Validator extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.updateSchema = this.updateSchema.bind(this);
  }

  updateSchema(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    let errorSection;
    const { valid, errors } = validate(this.state.value);

    if (!valid) {
      const errorComponents = errors.map((_, idx) => (<ValidationError key={ idx } error={ _ } />));
      errorSection = <section id='errors'>
        <Title level={ 2 }>Schema Errors</Title>
        <ul>
          { errorComponents }
        </ul>
      </section>;
    }
    return <>
      <Documentation />
      <section className='validator'>
        <textarea value={this.state.value} onChange={this.updateSchema}></textarea>
        { errorSection }
      </section>
    </>;
  }

  componentDidMount() {
    window.addEventListener('keydown', shortcutHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', shortcutHandler);
  }
}
