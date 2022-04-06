export class Login {
	static token = 0
	
	static getToken() {
		return this.token;
	}
	
	static setToken(data) {
		this.token = data;
	}
}