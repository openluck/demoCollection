import React, { Component } from "react";

export default class RandomJoke extends React.Component {
  state = {
    joke: null,
  };

  render() {
    return <Joke value={this.state.joke} />;
  }

  componentDidMount() {
    fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ joke: json.joke });
      });
  }
}
