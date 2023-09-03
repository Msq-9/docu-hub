import config from 'config';

type AuthInfo = {
  email?: string;
  firstname?: string;
  lastname?: string;
  token?: string;
  message?: string;
};

class AuthClient {
  private baseURL;
  private commonHeaders;

  constructor() {
    this.baseURL = config.get('docuHubApiURL');
    this.commonHeaders = {
      Authorization: `api_key ${config.get('api_key')}`,
      'Content-Type': 'application/json'
    };
  }

  async login(username: string, password: string): Promise<AuthInfo> {
    const response = await fetch(`${this.baseURL}login`, {
      method: 'POST',
      headers: this.commonHeaders,
      body: JSON.stringify({ email: username, password })
    });
    return await response.json();
  }

  async validateToken(token: string): Promise<AuthInfo> {
    const response = await fetch(`${this.baseURL}auth/verify`, {
      headers: { Authorization: token }
    });
    return await response.json();
  }

  async register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<AuthInfo> {
    const response = await fetch(`${this.baseURL}register`, {
      method: 'POST',
      headers: this.commonHeaders,
      body: JSON.stringify({ email, password, firstname, lastname })
    });
    return await response.json();
  }
}

export default AuthClient;
