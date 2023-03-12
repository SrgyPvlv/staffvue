import http from '../http-common';
import TokenService from "./token.service";

class AuthService {
  login({ username, password }) {
    return http
      .post('/auth/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, password }) {
    return http.post('/auth/signup', {
      username,
      password
    });
  }
}

export default new AuthService();