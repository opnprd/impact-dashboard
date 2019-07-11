import React, { Component } from 'react';
import PropTypes from 'prop-types';
import yaml from 'js-yaml';

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
    const schema = yaml.safeLoad(value);
    ({ valid, errors = [] } = validateSyndicationFormat(schema));
  } catch (error) {
    console.error(error);
    valid = false;
    errors = [ { message: 'invalid document', path: '' } ];
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

  async loadRsf(url) {
    let content;
    try {
      const response = await fetch(url);
      content = await response.text();
    } catch (error) {
      return;
    }
    this.setState(() => ({ value: content }));
  }

  render() {
    let errorSection = <section id='errors'>
      <Title level={ 3 }>Great job! </Title>
      <p>No errors in that file!</p>
    </section>;
    const { valid, errors } = validate(this.state.value);

    if (!valid) {
      const errorComponents = errors.map((_, idx) => (<ValidationError key={ idx } error={ _ } />));
      errorSection = <section id='errors'>
        <Title level={ 3 }>Schema Errors</Title>
        <ul>
          { errorComponents }
        </ul>
      </section>;
    }
    return <>
      <Documentation />
      <section className='validator'>
        <Title>Validator</Title>
        <textarea value={this.state.value} onChange={this.updateSchema}></textarea>
        <p>
          Examples:
          <button onClick={ () => this.loadRsf('./examples/minimal.yaml') }>Load minimal YAML</button>
          <button onClick={ () => this.loadRsf('./examples/minimal.json') }>Load minimal JSON</button>
          <button onClick={ () => this.loadRsf('./examples/full.yaml') }>Load full YAML</button>
          <button onClick={ () => this.loadRsf('./examples/full.json') }>Load full JSON</button>
        </p>
        { errorSection }
      </section>
    </>;
  }

  componentDidMount() {
    window.addEventListener('keydown', shortcutHandler);
    this.loadRsf('./examples/minimal.yaml');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', shortcutHandler);
  }
}
