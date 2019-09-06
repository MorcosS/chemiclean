import Product from "../redux/types/products/productsTypes";
import { CONSTANTS } from '../constants/Constants';

export function getAllProducts<T>(page: number): Promise<T> {
  return fetch(CONSTANTS.BASE_URL + `Products?page=${page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json();
    })
}

export function deleteProduct<T>(id: number): Promise<T> {
  return fetch(CONSTANTS.BASE_URL + `Products?id=${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json();
    })
}

export function updateProduct<T>(updatedProduct: Product): Promise<T> {
  return fetch(CONSTANTS.BASE_URL + `Products?id=${updatedProduct.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedProduct)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json();
    })
}

export function addProduct<T>(product: Product): Promise<T> {
  return fetch(CONSTANTS.BASE_URL + `Products`, {
    method: 'POST',
    body: JSON.stringify(product)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json();
    })
}