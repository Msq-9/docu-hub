import { Resolvers, User } from '@schema//types';

const handler = () => {};

export const userResolver: Resolvers = {
  Query: {
    user: (parent, args, contextValue, info): User => {
      return { id: 'mmm' };
    }
  }
};
