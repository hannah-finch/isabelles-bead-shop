import { jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  isLoggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("id_token");
        return true;
      }
      return false;
    }
    catch (err) {
      return console.log("Token is expired:", err);
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("cartItems");

    window.location.assign("/");
  }

  // isLoggedIn() {
  //   return !!localStorage.getItem("id_token");
  // }
  // getAccessToken() {
  //   return localStorage.getItem("id_token");
  // }
  // getProfile() {
  //   return jwtDecode(localStorage.getItem("id_token"));
  // }
  // //TODO: Figure out how to get ADMIN
  isAdmin() {
    const profile = this.getProfile();
    return profile.data.role === "admin";
  }
  isClient() {
    const profile = this.getProfile();
    return profile.data.role === "client";
  }
}

export default new AuthService();
