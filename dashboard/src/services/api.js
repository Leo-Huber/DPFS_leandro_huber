
/**
 * Hace una petición GET a /api{path}
 * @param {string} path  Ruta dentro de /api, e.g. '/users'
 * @returns {Promise<any>}  Datos parseados JSON
 */
export async function getRequest(path) {
  const res = await fetch(`/api${path}`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}
