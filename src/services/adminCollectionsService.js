const BASE_URL = "https://api.vegebase.io/admin";

class AdminCollectionsService {
  async getCollections(token) {
    const url = `${BASE_URL}/collections`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`Error while fetching requested collections`);
    }
    const data = await response.json();
    return data;
  }

  async getCollection(id, token) {
    const url = `${BASE_URL}/collections/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`Error while fetching requested resource`);
    }
    const data = await response.json();
    return data;
  }
}

export default new AdminCollectionsService();
