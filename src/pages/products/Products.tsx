import React, { ChangeEvent } from "react";
import { Table, Pagination, PageItem, Form } from "react-bootstrap";
import Product, { ProductsState, Paging } from "../../redux/types/products/productsTypes";
import { getProducts } from '../../redux/actions/products/productsActions';
import { connect } from 'react-redux'
import { AppState } from "../../redux/reducers";
import ProductItem from "../../components/product/ProductItem"
import { PaginationComponent } from '../../components/pagination/PaginationComponent';
import i18n from "i18next";
import { CONSTANTS } from '../../constants/Constants';

interface ProductsProps {
  products: Product[],
  getProducts: (page: number) => void,
  paging: Paging
}


class Products extends React.Component<ProductsProps> {

  componentDidMount() {
    this.props.getProducts(0)
  }


  changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang, (err, t) => {
      if (err) return ;
      this.forceUpdate()
    })
  }

  render() {
    const { products, getProducts, paging } = this.props
    return (
      <div className="App">
        <form>
          <input 
            type='radio'
            name="language" value="en"
            onChange={(event) => this.changeLanguage("en")}
            defaultChecked
          />
          <label className='custom-control-label' htmlFor='customSwitchesChecked'>    
          English    &nbsp;
          </label>
            <input 
            type='radio'
            name="language" value="da"
            onChange={(event) => this.changeLanguage("da")}
            
          />
          <label className='custom-control-label' htmlFor='customSwitchesChecked'>
            Dannish    
          </label>
        </form>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>{i18n.t(CONSTANTS.NAME)}</th>
              <th>{i18n.t(CONSTANTS.SUPPLIER)}</th>
              <th>{i18n.t(CONSTANTS.UPDATED)}</th>
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
