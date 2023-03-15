//Get request
// const getData = async (url = "") => {
//   return await fetch(url,{
//     mode: 'cors',
//   })
//   .then(response => response.json())
//   .catch(error => console.log('Get error: ',error))
// }

import { data } from "../api/data";

const getData = async (pageNumber) => {
  return data[pageNumber];
};
//Post request
const postData = async (url = "", data = {}) => {
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log("Post error: ", error));
};

export { getData, postData };
