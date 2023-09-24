import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';
import { ValueOrPromise } from '@apollo/datasource-rest/dist/RESTDataSource';
import { Document, DocumentInput, User } from '@schema/types';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class DocuHubAPI extends RESTDataSource {
  private token: string;
  constructor(options: { token: string }) {
    super();
    this.baseURL = publicRuntimeConfig.docuHubApiURL as string;
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

  async getRichTextDocById(docId: string): Promise<Document> {
    return this.get<Document>(`documents/${docId}`);
  }

  async getDocumentsByUser(userId: string): Promise<Array<Document>> {
    return await this.get<Array<Document>>(`users/${userId}/documents`);
  }

  async getAllUsers(): Promise<Array<User>> {
    return this.get<Array<User>>('users');
  }

  async createDocument(title: string): Promise<Document> {
    return this.post<Document>('documents', { body: { title } });
  }

  async updateDocument(documentData: DocumentInput): Promise<Document> {
    return this.put<Document>(`documents/${documentData.id}`, {
      body: { title: documentData.title, sharedTo: documentData.sharedTo }
    });
  }

  async deleteDocument(docId: string): Promise<boolean> {
    const res = await this.delete(`documents/${docId}`);
    return res.status === 204;
  }
}

export default DocuHubAPI;
