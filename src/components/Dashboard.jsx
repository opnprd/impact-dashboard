import React, { Component } from 'react';
import { loadReports } from '../reports';
import Title from './Title.jsx';
import Block from './Block.jsx';

const calcGrid = (pos, cols) => `grid-${Math.floor(pos / cols) + 1}-${(pos % cols) + 1}`;

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
    const reportBlocks = capitals.map((capital, idx) => {
      const gridPos = calcGrid(idx, 3);
      return <Block title={ capital }
        key={ idx }
        data={ data.filter(_ => _.capital === capital) }
        label='reports'
        gridPos={ gridPos }
      />;
    });s

    return (<>
      <Title level={1}>{ title }</Title>
      <div className='grid-wrap'>{ reportBlocks }</div>
    </>);
  }
}
