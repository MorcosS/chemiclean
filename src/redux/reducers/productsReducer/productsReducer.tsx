import {
  ProductsActionTypes,
  ProductsState,
  GET_PRODUCTS_REQUEST_SUCCESS,
  GET_PRODUCTS_REQUEST_STARTED,
  GET_PRODUCTS_REQUEST_FAILURE,
  UPDATE_PRODUCTS_REQUEST_STARTED,
  UPDATE_PRODUCTS_REQUEST_SUCCESS,
  UPDATE_PRODUCTS_REQUEST_FAILURE,
  DELETE_PRODUCTS_REQUEST_STARTED,
  DELETE_PRODUCTS_REQUEST_SUCCESS,
  DELETE_PRODUCTS_REQUEST_FAILURE,
  ADD_PRODUCTS_REQUEST_STARTED,
  ADD_PRODUCTS_REQUEST_SUCCESS,
  ADD_PRODUCTS_REQUEST_FAILURE,
  UPDATE_DOCUMENT_REQUEST_STARTED,
  UPDATE_DOCUMENT_REQUEST_SUCCESS,
  UPDATE_DOCUMENT_REQUEST_FAILURE
} from "../../types/products/productsTypes";

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: false,
  paging: {
    currentPage: 1,
    count: 0,
    itemsPerPage: 0
  }
};

export function productsReducer(
  state = initialState,
  action: ProductsActionTypes
): ProductsState {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };

    case GET_PRODUCTS_REQUEST_SUCCESS:
      return {
        ...state,
        products: action.data.items,
        error: false,
        loading: false,
        paging: {
          count: action.data.count,
          itemsPerPage: action.data.items.length,
          currentPage: action.currentPage
        }
      };

    case GET_PRODUCTS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    case UPDATE_PRODUCTS_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };

    case UPDATE_PRODUCTS_REQUEST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false
      };

    case UPDATE_PRODUCTS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    case UPDATE_DOCUMENT_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };

    case UPDATE_DOCUMENT_REQUEST_SUCCESS:
      let filteredArray = state.products.filter(function(obj) {
        if (obj.id === action.data) {
          let objUpdated = {
            id: obj.id,
            supplier: obj.supplier,
            isUpdated: true,
            name: obj.name
          };
          return objUpdated;
        } else {
          return obj;
        }
      });
      return {
        ...state,
        products: filteredArray,
        error: false,
        loading: false
      };

    case UPDATE_DOCUMENT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    case DELETE_PRODUCTS_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };

    case DELETE_PRODUCTS_REQUEST_SUCCESS:
      let myArray = state.products.filter(function(obj) {
        return obj.id !== action.data;
      });
      return {
        ...state,
        error: false,
        loading: false,
        products: myArray
      };

    case DELETE_PRODUCTS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    case ADD_PRODUCTS_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };

    case ADD_PRODUCTS_REQUEST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false
      };

    case ADD_PRODUCTS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
