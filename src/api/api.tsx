import Product from "../redux/types/products/productsTypes";
import { CONSTANTS } from '../constants/Constants';
import { Response } from '../redux/types/Response/responseType';
export function getAllProducts<T>(page: number): Promise<Response> {
  return fetch(CONSTANTS.BASE_URL + `Products?page=${page}`)
    .then(response => {
      if (!response.ok) {
        return {error: Error(response.statusText),hasError:true}
      }
      return response.json();
    })
}

export function deleteProduct<T>(id: number): Promise<Response> {
  return fetch(CONSTANTS.BASE_URL + `Products?id=${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (!response.ok) {
        return { error: Error(response.statusText), hasError: true }
      }
      return response.json();
    })
}

export function updateProduct<T>(updatedProduct: Product): Promise<Response> {
  return fetch(CONSTANTS.BASE_URL + `Products/${updatedProduct.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedProduct)
  })
    .then(response => {
      if (!response.ok) {
        return { error: Error(response.statusText), hasError: true }
      }
      return response.json();
    })
}

export function addProduct<T>(product: Product): Promise<Response> {
  return fetch(CONSTANTS.BASE_URL + `Products`, {
    method: 'POST',
    body: JSON.stringify(product)
  })
    .then(response => {
      if (!response.ok) {
        return { error: Error(response.statusText), hasError: true }
      }
      return response.json();
    })
}