export default function (context, inject) {
  const appId = "L27CG164QL";

  const baseUrl = `https://${appId}.algolia.net/1/indexes`;

  const headers = {
    "X-Algolia-API-Key": "c6dd0b9d4136625a0ad3cde3c00e5298",
    "X-Algolia-Application-Id": appId,
  };

  inject("dataApi", {
    getHome,
    getReviewsByHomeId,
  });

  async function getHome(homeId) {
    try {
      return unwrap(
        await fetch(`${baseUrl}/homes/${homeId}`, {
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

  async function getReviewsByHomeId(homeId) {
    try {
      return unwrap(
        await fetch(`${baseUrl}/reviews/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
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
