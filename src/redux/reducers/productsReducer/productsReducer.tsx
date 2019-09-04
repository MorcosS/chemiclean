import { ProductsActionTypes, ProductsState, GET_PRODUCTS_REQUEST_SUCCESS } from "../../types/products/productsTypes";

const initialState: ProductsState = {
    products: []
  }
  
  export function productsReducer(
    state = initialState,
    action: ProductsActionTypes
  ): ProductsState {
    switch (action.type) {
      case GET_PRODUCTS_REQUEST_SUCCESS:
        return {
            products: action.data
        }
      default:
        return state
    }
  }