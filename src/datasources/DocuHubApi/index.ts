import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';
import { ValueOrPromise } from '@apollo/datasource-rest/dist/RESTDataSource';
import { User } from '@schema/types';

class DocuHubAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8000/';
  }

  protected willSendRequest(
    path: string,
    requestOpts: AugmentedRequest
  ): ValueOrPromise<void> {
    requestOpts.headers['Authorization'] = '';
  }

  async getUserById(userId: string): Promise<User> {
    return this.get<User>(`users/${userId}`);
  }

  async getAllUsers(): Promise<Array<User>> {
    return this.get<Array<User>>('users');
  }
}
