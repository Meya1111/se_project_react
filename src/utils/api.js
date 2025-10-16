const baseUrl = "http://localhost:3007"; 

export const getItems = () => {
return fetch(`${baseUrl}/items`)
.then((res) => {
if (res.ok) {
return res.json();
}
return Promise.reject(`Error: ${res.status}`);
});
};

export const addItem = (item) => {
 return fetch(`${baseUrl}/items`, {
 method: "POST",
 headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(item),
}).then((res) => {
if (res.ok) {
return res.json();
}
return Promise.reject(`Error: ${res.status}`);
});
};

export const deleteItem = (itemId) => {
return fetch(`${baseUrl}/items/${itemId}`, {
method: "DELETE",
}).then((res) => {
if (res.ok) {
 return res.json();
}
 return Promise.reject(`Error: ${res.status}`);
 });
};