export function fetchUser(id) {
  return fetch(`/api/users/${id}`).then(r => r.json());
}
