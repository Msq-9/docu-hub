import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';
import {
  DataSourceConfig,
  ValueOrPromise
} from '@apollo/datasource-rest/dist/RESTDataSource';
import { User } from '@schema/types';
import config from 'config';

class DocuHubAPI extends RESTDataSource {
  private token: string;
  constructor(options: { token: string }) {
    super();
    this.baseURL = config.get('docuHubApiURL');
    this.token = options.token;
  }

  protected willSendRequest(
    path: string,
    requestOpts: AugmentedRequest
  ): ValueOrPromise<void> {
    requestOpts.headers['Authorization'] = this.token;
  }

  async getUserById(userId: string): Promise<User> {
    return this.get<User>(`users/${userId}`);
  }

  async getAllUsers(): Promise<Array<User>> {
    return this.get<Array<User>>('users');
  }
}

export default DocuHubAPI;
