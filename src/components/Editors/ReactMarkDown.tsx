import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

const markdownContext = require.context("./input", false, /\.md$/);

interface Props {
  terms?: any;
}
type State = { value: string };

class ReactMarkDown extends Component<State, Props> {
  constructor(props) {
    super(props);

    this.state = { terms: null };
  }

  componentWillMount() {
    fetch(input)
      .then((response) => response.text())
      .then((text) => {
        this.setState({ terms: text });
      });
  }

  render() {
    return (
      <div className="content">
        <ReactMarkdown source={this.state.terms} />
      </div>
    );
  }
}

export default ReactMarkDown;
