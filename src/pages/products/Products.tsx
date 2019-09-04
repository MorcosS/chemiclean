import React from "react";
import { Table, Pagination, PageItem } from "react-bootstrap";
import { ProductsState } from "../../redux/types/products/productsTypes";



interface ProductsProps {
  chat: ProductsState
}


class Products extends React.Component<ProductsProps> {
  render() {
    return (
      <div className="App">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Products;
