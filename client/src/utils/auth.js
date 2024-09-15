import { jwtDecode } from "jwt-decode";

class AuthService {
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
  isLoggedIn() {
    return !!localStorage.getItem("id_token");
  }
  getAccessToken() {
    return localStorage.getItem("id_token");
  }
  getProfile() {
    return jwtDecode(localStorage.getItem("id_token"));
  }
  //TODO: Figure out how to get ADMIN
  isAdmin() {
    const profile = this.getProfile();
    return profile.role === "admin";
  }
  isClient() {
    const profile = this.getProfile();
    return profile.role === "client";
  }
}

export default new AuthService();
