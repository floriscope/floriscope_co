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
      throw new Error(`ÉCHEC DE CONNEXION:  ${response.errors.message}`);
    }
    const data = await response.json();
    return data;
  }
}

export default new AuthService();
