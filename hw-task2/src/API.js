import axios from 'axios';

const apiURL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export default class API {
  constructor() {
    this.usersURL = apiURL + '/users';
    this.tokenURL = apiURL + '/token';
    this.positionsURL = apiURL + '/positions';
  }

  getNextPage(page, count) {
    return axios.get(this.usersURL + `?page=${page}&count=${count}`).then(
      function(response) {
        return Promise.resolve(response.data);
      },
      function(error) {
        return Promise.reject(error.response);
      }
    );
  }
  getUser(id) {
    return axios.get(this.usersURL + `/${id}`).then(function(response) {
      return Promise.resolve(response.data);
    });
  }
  getToken() {
    return axios.get(this.tokenURL).then(function(response) {
      return Promise.resolve(response.data.token);
    });
  }
  getPositions() {
    return axios.get(this.positionsURL).then(function(response) {
      return Promise.resolve(response.data);
    });
  }
  sendForm(token, data) {
    return axios({
      method: 'POST',
      url: this.usersURL,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Token: token,
      },
    });
  }
}
