import { Product, NewProduct } from "../redux/types/products/productsTypes";
import { CONSTANTS } from "../constants/Constants";
import { Response } from "../redux/types/Response/responseType";
export function getAllProducts<T>(page: number): Promise<Response> {
  return fetch(CONSTANTS.API_BASE_URL + `Products?page=${page}`).then(
    response => {
      if (!response.ok) {
        return { error: Error(response.statusText), hasError: true };
      }
      return response.json();
    }
  );
}

export function deleteProduct<T>(id: number): Promise<Response> {
  return fetch(CONSTANTS.API_BASE_URL + `Product/${id}`, {
    method: "DELETE"
  }).then(response => {
    if (!response.ok) {
      return { error: Error(response.statusText), hasError: true };
    }
    return response.json();
  });
}

export function updateProduct<T>(updatedProduct: Product): Promise<Response> {
  return fetch(CONSTANTS.API_BASE_URL + `Product/${updatedProduct.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
    headers: { "content-type": "application/json" }
  }).then(response => {
    if (!response.ok) {
      return { error: Error(response.statusText), hasError: true };
    }
    return response.json();
  });
}

export function addProduct<T>(product: NewProduct): Promise<Response> {
  return fetch(CONSTANTS.API_BASE_URL + `Product`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "content-type": "application/json" }
  }).then(response => {
    if (!response.ok) {
      return { error: Error(response.statusText), hasError: true };
    }
    return response.json();
  });
}


export function updateProductDocument<T>(id:number): Promise<Response> {
  return fetch(CONSTANTS.BASE_URL + `Update/${id}`, {
    method: "GET"
  }).then(response => {
    if (!response.ok) {
      return { error: Error(response.statusText), hasError: true };
    }
    return { hasError:false};
  });
}
