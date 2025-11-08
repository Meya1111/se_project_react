const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

const handleRes = (res) =>
res.ok ? res.json() : res.json().then((e) => Promise.reject(e));

export function signup({ name, avatar, email, password }) {
return fetch(`${BASE_URL}/signup`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ name, avatar, email, password }),
}).then(handleRes);
 }

 export function signin({ email, password }) {
return fetch(`${BASE_URL}/signin`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, password }),
}).then(handleRes);
 }

 export function checkToken(token) {
return fetch(`${BASE_URL}/users/me`, {
method: "GET",
headers: {
"Content-Type": "application/json",
authorization: `Bearer ${token}`,
},
 }).then(handleRes);
 }
