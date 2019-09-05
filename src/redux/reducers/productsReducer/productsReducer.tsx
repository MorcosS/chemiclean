import { ProductsActionTypes, ProductsState, GET_PRODUCTS_REQUEST_SUCCESS } from "../../types/products/productsTypes";

const initialState: ProductsState = {
  products: [],
  paging: {
    currentPage: 1,
    count: 0,
    itemsPerPage: 0
  }
}

export function productsReducer(
  state = initialState,
  action: ProductsActionTypes
): ProductsState {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST_SUCCESS:
      return {
        ...state,
        products: action.data.items,
        paging: {
          count: action.data.count,
          itemsPerPage: action.data.items.length,
          currentPage: action.currentPage
        }
      }
    default:
      return state
  }
}