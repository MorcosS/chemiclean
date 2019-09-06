export const GET_PRODUCTS_REQUEST_STARTED = "GET_PRODUCTS_REQUEST_STARTED";
export const GET_PRODUCTS_REQUEST_SUCCESS = "GET_PRODUCTS_REQUEST_SUCCESS";
export const GET_PRODUCTS_REQUEST_FAILURE = "GET_PRODUCTS_REQUEST_FAILURE";

export const UPDATE_PRODUCTS_REQUEST_STARTED = "UPDATE_PRODUCTS_REQUEST_STARTED";
export const UPDATE_PRODUCTS_REQUEST_SUCCESS = "UPDATE_PRODUCTS_REQUEST_SUCCESS";
export const UPDATE_PRODUCTS_REQUEST_FAILURE = "UPDATE_PRODUCTS_REQUEST_FAILURE";

export const DELETE_PRODUCTS_REQUEST_STARTED = "DELETE_PRODUCTS_REQUEST_STARTED";
export const DELETE_PRODUCTS_REQUEST_SUCCESS = "DELETE_PRODUCTS_REQUEST_SUCCESS";
export const DELETE_PRODUCTS_REQUEST_FAILURE = "DELETE_PRODUCTS_REQUEST_FAILURE";

export const ADD_PRODUCTS_REQUEST_STARTED = "ADD_PRODUCTS_REQUEST_STARTED";
export const ADD_PRODUCTS_REQUEST_SUCCESS = "ADD_PRODUCTS_REQUEST_SUCCESS";
export const ADD_PRODUCTS_REQUEST_FAILURE = "ADD_PRODUCTS_REQUEST_FAILURE";

export const EDIT_PRODUCT_ = "GET_ALL_PRODUCTS";

export default interface Product {
  id: number;
  name: string;
  supplier: string;
  isUpdated: boolean;
}

export interface Paging {
  currentPage: number,
  count: number,
  itemsPerPage: number
}

export interface ProductsState {
  products: Product[],
  paging: Paging,
  loading: boolean,
  error: boolean
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

interface UpdateProductFailureAction {
  type: typeof UPDATE_PRODUCTS_REQUEST_FAILURE;
}


interface UpdateProductStartAction {
  type: typeof UPDATE_PRODUCTS_REQUEST_STARTED;
}

interface UpdateProductsSuccessAction {
  type: typeof UPDATE_PRODUCTS_REQUEST_SUCCESS
}


interface AddProductFailureAction {
  type: typeof ADD_PRODUCTS_REQUEST_FAILURE;
}


interface AddProductStartAction {
  type: typeof ADD_PRODUCTS_REQUEST_STARTED;
}

interface AddProductsSuccessAction {
  type: typeof ADD_PRODUCTS_REQUEST_SUCCESS
}


interface DeleteProductFailureAction {
  type: typeof DELETE_PRODUCTS_REQUEST_FAILURE;
}


interface DeleteProductStartAction {
  type: typeof DELETE_PRODUCTS_REQUEST_STARTED;
}

interface DeleteProductsSuccessAction {
  type: typeof DELETE_PRODUCTS_REQUEST_SUCCESS,
  data: {
    items: Product[],
    count: number
  },
}





export type ProductsActionTypes = GetProductsStartAction | GetProductsSuccessAction | GetProductsFailureAction | UpdateProductFailureAction | UpdateProductStartAction | UpdateProductsSuccessAction | AddProductFailureAction | AddProductStartAction | AddProductsSuccessAction | DeleteProductFailureAction | DeleteProductStartAction | DeleteProductsSuccessAction
