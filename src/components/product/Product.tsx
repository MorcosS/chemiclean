import React from "react";
import IProduct from "../../Interfaces/product/IProduct";

export default class UserComponent extends React.Component<IProduct, {}> {
  constructor(props: IProduct) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>User Component</h1>
        Hello, {this.props.name}
        <br />
        You are {this.props.id} years old,
        <br />
        You live at: {this.props.supplier}
        <br />
        you were born: {this.props.isUpdated}
      </div>
    );
  }
}
