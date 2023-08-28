import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';
import { ValueOrPromise } from '@apollo/datasource-rest/dist/RESTDataSource';
import config from 'config';

type AuthInfo = {
  email?: string;
  firstname?: string;
  lastname?: string;
  token?: string;
  message?: string;
};

class AuthClient extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.get('docuHubApiURL');
  }

  protected willSendRequest(
    path: string,
    requestOpts: AugmentedRequest
  ): ValueOrPromise<void> {
    requestOpts.headers['Authorization'] = `api_key ${config.get('api_key')}`;
  }

  async login(username: string, password: string): Promise<AuthInfo> {
    return await this.post<AuthInfo>('login', {
      body: { email: username, password }
    });
  }

  async validateToken(token: string): Promise<AuthInfo> {
    return await this.get<AuthInfo>('auth/verify', {
      headers: { Authorization: token }
    });
  }
}

export default AuthClient;
