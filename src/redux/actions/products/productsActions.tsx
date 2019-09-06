import Product, {
  GET_PRODUCTS_REQUEST_STARTED,
  GET_PRODUCTS_REQUEST_SUCCESS,
  GET_PRODUCTS_REQUEST_FAILURE,
  ProductsState,
  DELETE_PRODUCTS_REQUEST_STARTED,
  DELETE_PRODUCTS_REQUEST_SUCCESS,
  UPDATE_PRODUCTS_REQUEST_STARTED,
  UPDATE_PRODUCTS_REQUEST_SUCCESS,
  ADD_PRODUCTS_REQUEST_SUCCESS,
  ADD_PRODUCTS_REQUEST_STARTED
} from "../../types/products/productsTypes";
import { getAllProducts,deleteProduct, updateProduct, addProduct } from "../../../api/api";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export const getProducts = (page: number): ThunkAction<void, ProductsState, null, Action<string>> =>
  // make async call to api, handle promise, dispatch action when promise is resolved
  async dispatch => {
    dispatch({
      type: GET_PRODUCTS_REQUEST_STARTED
    });
    return getAllProducts(page)
      .then(response => {
        dispatch({
          type: GET_PRODUCTS_REQUEST_SUCCESS,
          data: response,
          currentPage: page
        });
      })
      .catch(error => {
        throw error;
      });
  };


  export const deleteProductAction = (id: number): ThunkAction<void, ProductsState, null, Action<string>> =>
  // make async call to api, handle promise, dispatch action when promise is resolved
  async dispatch => {
    dispatch({
      type: DELETE_PRODUCTS_REQUEST_STARTED
    });
    return deleteProduct(id).then(response => {
       console.log(response,'response')
        dispatch({
          type: DELETE_PRODUCTS_REQUEST_SUCCESS,
          data: response,
        });
      })
      .catch(error => {
        throw error;
      });
  };

  export const updateProductAction = (updatedProduct: Product): ThunkAction<void, ProductsState, null, Action<string>> =>
  // make async call to api, handle promise, dispatch action when promise is resolved
  async dispatch => {
    dispatch({
      type: UPDATE_PRODUCTS_REQUEST_STARTED
    });
    return updateProduct(updatedProduct).then(response => {
        dispatch({
          type: UPDATE_PRODUCTS_REQUEST_SUCCESS,
          data: response,
        });
      })
      .catch(error => {
        throw error;
      });
  };

  export const addProductAction = (newProduct: Product): ThunkAction<void, ProductsState, null, Action<string>> =>
  // make async call to api, handle promise, dispatch action when promise is resolved
  async dispatch => {
    dispatch({
      type: ADD_PRODUCTS_REQUEST_STARTED
    });
    return addProduct(newProduct).then(response => {
        dispatch({
          type: ADD_PRODUCTS_REQUEST_SUCCESS,
          data: response,
        });
      })
      .catch(error => {
        throw error;
      });
  };