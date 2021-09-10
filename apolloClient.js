import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: 'https://fronterappqa.azurewebsites.net/graphql',
    cache: new InMemoryCache()
});

export default apolloClient;