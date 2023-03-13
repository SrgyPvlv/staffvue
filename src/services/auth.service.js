import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(user) {
    return api
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
    return api.post('/auth/signup', {
      username,
      password
    });
  }
}

export default new AuthService();