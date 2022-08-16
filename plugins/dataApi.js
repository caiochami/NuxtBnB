export default function (context, inject) {
  const appId = "L27CG164QL";

  const apiKey = "c6dd0b9d4136625a0ad3cde3c00e5298";

  const baseUrl = `https://${appId}.algolia.net/1/indexes/homes`;

  inject("dataApi", {
    getHome,
  });

  async function getHome(homeId) {
    const response = await fetch(`${baseUrl}/${homeId}`, {
      headers: {
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": appId,
      },
    });

    return response.json();
  }
}
