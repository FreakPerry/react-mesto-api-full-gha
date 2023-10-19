class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Произошла ошибка: ${res.status}`);
  }

  _getRequestOptions(method, body) {
    const requestOptions = {
      method: method,
      headers: this._headers,
      credentials: 'include'
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    return requestOptions;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, this._getRequestOptions('GET')).then(
      this._handleResponse
    );
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, this._getRequestOptions('GET')).then(this._handleResponse);
  }

  editUserInfo(data) {
    return fetch(
      `${this._url}/users/me`,
      this._getRequestOptions('PATCH', {
        name: data.name,
        about: data.about
      })
    ).then(this._handleResponse);
  }

  addCards(data) {
    return fetch(
      `${this._url}/cards`,
      this._getRequestOptions('POST', {
        name: data.name,
        link: data.link
      })
    ).then(this._handleResponse);
  }

  like(id) {
    return fetch(`${this._url}/cards/${id}/likes`, this._getRequestOptions('PUT')).then(
      this._handleResponse
    );
  }

  changeLikeCardStatus(obj, variable) {
    this._status = variable ? this.like(obj._id) : this.dislike(obj._id);
    return this._status;
  }

  dislike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, this._getRequestOptions('DELETE')).then(
      this._handleResponse
    );
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, this._getRequestOptions('DELETE')).then(
      this._handleResponse
    );
  }

  editAvatar(data) {
    return fetch(
      `${this._url}/users/me/avatar`,
      this._getRequestOptions('PATCH', {
        avatar: data.avatar
      })
    ).then(this._handleResponse);
  }
}

export const api = new Api({
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});
