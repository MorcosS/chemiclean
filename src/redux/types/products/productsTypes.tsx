export const GET_PRODUCTS_REQUEST_STARTED = "GET_PRODUCTS_REQUEST_STARTED";
export const GET_PRODUCTS_REQUEST_SUCCESS = "GET_PRODUCTS_REQUEST_SUCCESS";
export const GET_PRODUCTS_REQUEST_FAILURE = "GET_PRODUCTS_REQUEST_FAILURE";

export const EDIT_PRODUCT_ = "GET_ALL_PRODUCTS";

export default interface Product {
  id: number;
  name: String;
  supplier: String;
  isUpdated: boolean;
}

export interface Paging {
  currentPage: number,
  count: number,
  itemsPerPage: number
}

export interface ProductsState {
  products: Product[],
  paging: Paging
}

interface GetProductsStartAction {
  type: typeof GET_PRODUCTS_REQUEST_STARTED;
}

interface GetProductsSuccessAction {
  type: typeof GET_PRODUCTS_REQUEST_SUCCESS,
  data: {
    items: Product[],
    count: number
  },
  currentPage: number
}

interface GetProductsFailureAction {
  type: typeof GET_PRODUCTS_REQUEST_FAILURE;
}

export type ProductsActionTypes = GetProductsStartAction | GetProductsSuccessAction | GetProductsFailureAction
