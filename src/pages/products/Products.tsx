import React from "react";
import { Table, Pagination, PageItem } from "react-bootstrap";
import Product, { ProductsState, Paging } from "../../redux/types/products/productsTypes";
import { getProducts } from '../../redux/actions/products/productsActions';
import { connect } from 'react-redux'
import { AppState } from "../../redux/reducers";
import ProductItem from "../../components/product/ProductItem"
import { PaginationComponent } from '../../components/pagination/PaginationComponent';


interface ProductsProps {
  products: Product[],
  getProducts: (page: number) => void,
  paging: Paging
}


class Products extends React.Component<ProductsProps> {

  componentDidMount() {
    this.props.getProducts(0)
  }

  render() {
    const { products,getProducts ,paging} = this.props
    return (
      <div className="App">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Supplier</th>
              <th>Updated ?</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) =>
              <ProductItem id={product.id} name={product.name} isUpdated={product.isUpdated} supplier={product.supplier} />
            )}
          </tbody>
        </Table>
        <PaginationComponent fetchMoreData={(nextPage: number) => getProducts(nextPage)} count={100} currentPage={paging.currentPage} itemsPerPage={10} />
      </div>
    );
  }
}

function mapStateToProps(state: AppState): ProductsState {
  return {
    products: state.products.products,
    paging: state.products.paging
  };
}

const mapDispatchToProps = {
  getProducts
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
