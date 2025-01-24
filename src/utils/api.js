const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const getClothingItems = () => {
  return request(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addClothingItems = (newItem, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newItem),
  });
};

const deleteClothingItems = (item, token) => {
  return request(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export { baseUrl, getClothingItems, addClothingItems, deleteClothingItems };
