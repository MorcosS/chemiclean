import React from "react";
import { Table } from "react-bootstrap";
import {
  Product,
  ProductsState,
  Paging,
  NewProduct
} from "../../redux/types/products/productsTypes";
import {
  getProducts,
  deleteProductAction,
  updateProductAction,
  addProductAction,
  updateProductDocumentAction
} from "../../redux/actions/products/productsActions";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";
import ProductItem from "../../components/product/ProductItem";
import { PaginationComponent } from "../../components/pagination/PaginationComponent";
import i18n from "i18next";
import { CONSTANTS } from "../../constants/Constants";
import AddProduct from "../../components/product/NewProduct";

interface ProductsProps {
  products: Product[];
  getProducts: (page: number) => void;
  deleteProductAction: (id: number) => void;
  updateProductAction: (product: Product) => void;
  updateProductDocumentAction: (id: number) => void;
  addProductAction: (product: NewProduct) => void;
  paging: Paging;
}

interface ProductsStates {
  modalVisibility: boolean;
}

class Products extends React.Component<ProductsProps, ProductsStates> {
  constructor(props: ProductsProps) {
    super(props);
    this.state = {
      modalVisibility: false
    };
  }

  componentDidMount() {
    this.props.getProducts(0);
  }

  changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang, (err, t) => {
      if (err) return;
      this.forceUpdate();
    });
  };

  showModal = (visibility: boolean) => {
    this.setState({ modalVisibility: visibility });
  };

  render() {
    const {
      products,
      getProducts,
      paging,
      deleteProductAction,
      updateProductAction,
      addProductAction,
      updateProductDocumentAction
    } = this.props;
    const { modalVisibility } = this.state;

    return (
      <div className="App">
        <form>
          <input
            type="radio"
            name="language"
            value="en"
            onChange={() => this.changeLanguage("en")}
            defaultChecked
          />
          <label
            className="custom-control-label"
            htmlFor="customSwitchesChecked"
          >
            {i18n.t(CONSTANTS.ENGLISH)} &nbsp;
          </label>
          <input
            type="radio"
            name="language"
            value="da"
            onChange={() => this.changeLanguage("da")}
          />
          <label
            className="custom-control-label"
            htmlFor="customSwitchesChecked"
          >
            {i18n.t(CONSTANTS.DANISH)}
          </label>
        </form>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>{i18n.t(CONSTANTS.NAME)}</th>
              <th>{i18n.t(CONSTANTS.SUPPLIER)}</th>
              <th>{i18n.t(CONSTANTS.UPDATED)}</th>
              <th>{i18n.t(CONSTANTS.DOWNLOAD)}</th>
              <th>{i18n.t(CONSTANTS.ACTION)}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <ProductItem
                updateProductDocument={updateProductDocumentAction}
                deleteItem={deleteProductAction}
                updateItem={updateProductAction}
                product={product}
              />
            ))}
          </tbody>
        </Table>
        <PaginationComponent
          fetchMoreData={(nextPage: number) => getProducts(nextPage)}
          count={paging.count}
          currentPage={paging.currentPage}
          itemsPerPage={10}
        />
        <AddProduct
          addProduct={addProductAction}
        />
      </div>
    );
  }
}

function mapStateToProps(state: AppState): ProductsState {
  return {
    products: state.products.products,
    paging: state.products.paging,
    loading: state.products.loading,
    error: state.products.error
  };
}

const mapDispatchToProps = {
  getProducts,
  deleteProductAction,
  updateProductAction,
  updateProductDocumentAction,
  addProductAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
