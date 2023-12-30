
class Api {
  constructor(mainUrl) {
    this._mainUrl = mainUrl;
  }

  _sendRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Что-то пошло не так...");
    });
  }

  getInfo() {
    return this._sendRequest(`${this._mainUrl}users/me`, {
      headers: {
        authorization: localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
    });
  }


  getInfoCards() {
    return this._sendRequest(`${this._mainUrl}cards`, {
      headers: {
        authorization: localStorage.getItem('token'),
        "Content-Type": "application/json",
      }
    })
  }

  setNewCard(link, name) {
    return this._sendRequest(`${this._mainUrl}cards`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      })
    })
  }

  setUserData(name, about) {
    return this._sendRequest(`${this._mainUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      })
    })
  }

  setUserAvatar(avatar) {
    return this._sendRequest(`${this._mainUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
  }

  deleteResponse(id) {
    return this._sendRequest(`${this._mainUrl}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem('token'),
        //"Content-Type": "application/json",
      }
    })
  }

  deleteResponseLike(id) {
    return this._sendRequest(`${this._mainUrl}cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
    })
  }

  addLikeToCard(id) {
    return this._sendRequest(`${this._mainUrl}cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
    })
  }
}

const api = new Api(process.env.REACT_APP_API_URL);


export default api;
