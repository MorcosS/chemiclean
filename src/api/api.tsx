import Product from "../redux/types/products/productsTypes";
import { CONSTANTS } from '../constants/Constants';


// export const getAllProducts = () => {
//     return new Promise(async resolve => {
//       var res = await fetch(
//         "http://localhost:64889/Api/" + `Products`,
//         {
//           method: "GET", // *GET, POST, PUT, DELETE, etc.
//           headers: new Headers({
//             "content-type": "application/json",
//             accept: "application/json"
//           })
//         }
//       );
//       resolve(res);
//     });
//   };

  export function getAllProducts<T>(page:number): Promise<T> {
    return fetch(CONSTANTS.BASE_URL + `Products?page=${page}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json();
      })
  
  }