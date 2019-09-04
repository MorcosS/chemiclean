import React from "react";
import Product from "../../redux/types/products/productsTypes";

export default class UserComponent extends React.Component<Product, {}> {
  constructor(props: Product) {
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
