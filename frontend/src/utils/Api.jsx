class Api {
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res){
    if(res.ok) {
      return res.json()}

      return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options){
    return fetch(url, options).then(this._getResponse)
  }

  getUserInfo(){
    return this._request(`${this._url}/users/me`, {headers: this._headers})
  }

  setUserInfo(data){
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,  
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.job
    })
      })
  }

  getAllCards(){
    return this._request(`${this._url}/cards`, {
     headers: this._headers
    })
  }

  createCard(data) {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,  
      method: 'POST',
      body: JSON.stringify(data)
      })
  }

  deleteCard(id){
    return this._request(`${this._url}/cards/${id}`, {
     headers: this._headers,  
     method: 'DELETE',})
  }

  isLikeAdd(id){
    return this._request(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,  
      method: 'PUT',
      })
  }

  isLikeRemove(id){
    return this._request(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,  
      method: 'DELETE',
      })
  }

  setAvatar(data){
    return this._request(`${this._url}/users/me/avatar`, {
      headers: this._headers,  
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.link
    })
      })
  }
}

export const api = new Api({
    url: 'https://api.mesto.balex.nomoredomainsmonster.ru',
    headers: {
      "Content-Type": "application/json",
    }})