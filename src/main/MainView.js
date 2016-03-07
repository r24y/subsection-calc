import React, { Component } from 'react';

import algo from '../algo';
import ordinal from 'ordinal';
import commafy from 'commafy';

export default class MainView extends Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    const input = this.props.location.query.input || 'A';
    this.state = {
      input: input,
      output: algo(input),
    };
  }
  handleInputChange(e) {
    this.setState({
      input: e.target.value,
    });
  }
  render() {
    const calculatedValue = algo(this.state.input);
    const displayedValue = isNaN(calculatedValue) ? 'Error: bad input' : ((v) => {
      const ordSuffix = ordinal(v).replace(/\d+/, '');
      const comm = commafy(v) + ordSuffix;
      const comm1 = commafy(v - 1);
      return `This is the ${comm} section of the document. There are ${comm1} sections before it.`;
    })(calculatedValue);
    return (<div className="container" style={{maxWidth: '400px'}}>
      <h1>Subsection calculator</h1>
      <p>Type the subsection number into the field to compute its numeric value.</p>
      <input className="form-control" onChange={::this.handleInputChange} value={this.state.input}/>
      <span>{displayedValue}</span>
    </div>);
  }
}
