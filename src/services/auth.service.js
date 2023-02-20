import http from '../http-common';
import authHeader from './auth-header';

class AuthService {
  login(user) {
    return http
      .post('/auth/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    return http.post("/auth/signout"),
    localStorage.removeItem('user');
  }

  register(user) {
    return http.post('/auth/signup', {
      username: user.username,
      password: user.password
    }, { headers: authHeader() });
  }
}

export default new AuthService();