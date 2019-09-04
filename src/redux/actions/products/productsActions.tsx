import {
  GET_PRODUCTS_REQUEST_STARTED,
  GET_PRODUCTS_REQUEST_SUCCESS,
  GET_PRODUCTS_REQUEST_FAILURE
} from "../../types/products/productsTypes";
import { getAllProducts } from "../../../api/api";

export const getProducts = (page: number) => {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    dispatch({
      type: GET_PRODUCTS_REQUEST_STARTED
    });

    return getAllProducts()
      .then(response => {
        dispatch({
          type: GET_PRODUCTS_REQUEST_SUCCESS,
          data: response
        });
      })
      .catch(error => {
        throw error;
      });
  };
};
