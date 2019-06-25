import React, { Component } from 'react';
import { loadReports } from '../reports';
import Title from './Title.jsx';
import Block from './Block.jsx';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadReports();
  }

  async loadReports() {
    // eslint-disable-next-line react/prop-types
    const data = await loadReports({ source: this.props.source });
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    const { title } = this.props;

    const capitals = [ 'social', 'human', 'natural', 'intellectual', 'financial', 'manufacturing' ];
    const reportBlocks = capitals.map((capital, idx) => (
      <Block title={ capital }
        key={ idx }
        data={ data.filter(_ => _.capital === capital) }
      />));

    return (<>
      <Title>{ title }</Title>
      { reportBlocks }
    </>);
  }
}
