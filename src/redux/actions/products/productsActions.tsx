import {
  GET_PRODUCTS_REQUEST_STARTED,
  GET_PRODUCTS_REQUEST_SUCCESS,
  GET_PRODUCTS_REQUEST_FAILURE,
  ProductsState
} from "../../types/products/productsTypes";
import { getAllProducts } from "../../../api/api";
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
