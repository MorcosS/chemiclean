import React from "react";
import Product from "../../redux/types/products/productsTypes";

export default class UserComponent extends React.Component<Product, {}> {
  constructor(props: Product) {
    super(props);
  }
  render() {
    const { id, name, isUpdated, supplier } = this.props
    return (
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>{supplier}</td>
          <td>{isUpdated.toString()}</td>
        </tr>
    );
  }
}
