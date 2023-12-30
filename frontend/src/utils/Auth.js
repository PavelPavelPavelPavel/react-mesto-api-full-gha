
class Auth {
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

	authentication(email, password) {
		return this._sendRequest(`${this._mainUrl}signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
	}

	authorization({ password, email }) {
		return this._sendRequest(`${this._mainUrl}signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ password, email }),
		});
	}

	getInfo() {
		return this._sendRequest(`${this._mainUrl}users/me`, {
			headers: {
				"Content-Type": "application/json",
				authorization: localStorage.getItem("token"),
			},
		});
	}

}


const auth = new Auth(process.env.REACT_APP_API_URL);

export default auth;
