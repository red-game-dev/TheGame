import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS  } from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = 'https://api-staging.csgoroll.com/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    new WebSocketLink({
      uri: "wss://api-staging.csgoroll.com/graphql",
      options: {
        reconnect: true,
      },
    }),
    httpLink.create({
      uri,
      withCredentials: true
    })
  );

  return {
    link,
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      }
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            currentUser: {
              merge(existing, incoming) {
                return {
                  ...existing,
                  ...incoming,
                  wallets: [...existing?.wallets || [], ...incoming?.wallets || []],
                };
              },
            },
          },
        },
      },
  }),
 }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
