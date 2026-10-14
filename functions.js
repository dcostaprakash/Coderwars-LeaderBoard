export function makeFetchRequest(username) {
return fetch(
`https://www.codewars.com/api/v1/users/${encodeURIComponent(username)}`,
);
}