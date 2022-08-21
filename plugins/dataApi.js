export default function (context, inject) {
  const appId = "L27CG164QL";

  const baseUrl = `https://${appId}.algolia.net/1/indexes/homes`;

  const headers = {
    "X-Algolia-API-Key": "c6dd0b9d4136625a0ad3cde3c00e5298",
    "X-Algolia-Application-Id": appId,
  };

  inject("dataApi", {
    getHome,
  });

  async function getHome(homeId) {
    try {
      return unwrap(
        await fetch(`${baseUrl}/${homeId}`, {
          headers,
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function unwrap(response) {
    const json = await response.json();

    const { ok, status, statusText } = response;

    return { ok, status, statusText, json };
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    };
  }
}
