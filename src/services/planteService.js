const BASE_URL = "https://api.vegebase.io";
const API_VERSION = "v1";

class PlanteService {
  async getPlante(id, token) {
    const url = `${BASE_URL}/${API_VERSION}/plantes/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(
        `AuthService Login failed, HTTP status ${response.status}`
      );
    }
    const data = await response.json();
    return data.plante;
  }
  async getPlanteResources(id, resourceName, token) {
    const url = `${BASE_URL}/${API_VERSION}/plantes/${id}/${resourceName}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(
        `AuthService Login failed, HTTP status ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  }
}

export default new PlanteService();
