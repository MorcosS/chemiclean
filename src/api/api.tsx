

export const getAllProducts = () => {
    return new Promise(async resolve => {
      var res = await fetch(
        "http://localhost:64889/" + `products`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: new Headers({
            "content-type": "application/json",
            accept: "application/json"
          })
        }
      );
    });
  };