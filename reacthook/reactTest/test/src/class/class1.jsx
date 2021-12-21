import React, { Component } from "react";
class CustomForm extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  handleSubmit = () => {
    console.log("this.myRef ", this.myRef);
  };
  shouldComponentUpdate(nextProps, nextState) {
    console.log(1);
    console.log('nextProps, nextState',nextProps, nextState);
  }
  render() {
    return (
      // <form onSubmit={this.handleSubmit}>
      //   <input type="text" ref={(input) => (this.input = input)} />
      //   <button type="submit">Submit</button>
      //   <div ref={this.myRef} />;
      // </form>
      <div>
        <div ref={this.myRef} />;
        <button type="" onClick={this.handleSubmit}>点击</button>
      </div>
    );
  }
}
export default CustomForm;
