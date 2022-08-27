export async function unwrap(response) {
  const json = await response.json();

  const { ok, status, statusText } = response;

  return { ok, status, statusText, json };
}
