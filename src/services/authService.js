const BASE_URL = "https://api.vegebase.io";

class AuthService {
  async login(credentials) {
    const url = `${BASE_URL}/auth/sign_in`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
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

export default new AuthService();
