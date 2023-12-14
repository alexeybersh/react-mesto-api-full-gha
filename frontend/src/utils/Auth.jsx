class Auth {
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
  
  register(email, password){
    return this._request(`${this._url}/signup`, {
      headers: this._headers,  
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    }) 
  }

  authorize(email, password){
    return this._request(`${this._url}/signin`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password
      })
    }) 
  }

  getContent(token){
    return this._request(`${this._url}/users/me`,{
      method: 'GET',    
      headers:{
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }})
  }  
}

export const authApi = new Auth({
  url: 'https://api.mesto.balex.nomoredomainsmonster.ru',
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
  }})

  // console.log("<<");